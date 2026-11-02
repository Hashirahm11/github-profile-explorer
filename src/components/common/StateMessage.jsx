export default function StateMessage({ icon: Icon, title, children, action, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
    error: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
  };
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center" role={tone === 'neutral' ? undefined : 'alert'}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${tones[tone]}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children && <p className="muted mt-2 max-w-md text-sm">{children}</p>}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
