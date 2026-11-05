interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="py-20 bg-white-soft min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white-pure p-8 md:p-12 rounded-3xl border border-elephant/10 shadow-sm">
        <h1 className="text-3xl font-serif mb-6 text-elephant">{title}</h1>
        <div className="prose prose-elephant text-elephant-muted">
          {children}
        </div>
      </div>
    </div>
  );
}
