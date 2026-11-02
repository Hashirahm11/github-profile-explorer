export default function PageHeader({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="muted mt-1 max-w-2xl text-sm sm:text-base">{description}</p>}
      </div>
      {children}
    </div>
  );
}
