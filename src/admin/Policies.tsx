import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { Save, FileText } from "lucide-react";

export function Policies() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchPolicies = async () => {
    const { data, error } = await supabase
      .from("policies")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) setPolicies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const startEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("policies")
      .update({ content: editContent, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) alert(error.message);
    else {
      setEditingId(null);
      fetchPolicies();
    }
    setIsSaving(false);
  };

  if (loading) return <div className="p-8">Loading policies...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif text-elephant mb-2">Policy Editor</h1>
      <p className="text-sm text-elephant-muted mb-8">
        Update the legal text for your website without touching the code.
      </p>

      <div className="space-y-6">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white-pure p-6 rounded-2xl border border-elephant/10 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-elephant/5 rounded-lg text-elephant">
                  <FileText size={20} />
                </div>
                <h2 className="text-lg font-semibold text-elephant capitalize">
                  {policy.title}
                </h2>
              </div>
              {editingId !== policy.id && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(policy.id, policy.content)}>
                  Edit Policy
                </Button>
              )}
            </div>

            {editingId === policy.id ? (
              <div>
                <textarea
                  className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft text-sm min-h-[200px] font-mono focus:outline-none focus:border-burnt"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSave(policy.id)}
                    disabled={isSaving}>
                    <Save size={16} className="mr-2" />{" "}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-elephant-muted bg-white-soft p-4 rounded-xl whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                {policy.content}
              </div>
            )}
            <p className="text-xs text-elephant-muted/50 mt-3">
              Last updated: {new Date(policy.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
