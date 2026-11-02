export function ProfileSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading profile">
      <div className="card flex flex-col gap-6 p-6 sm:flex-row">
        <div className="skeleton h-28 w-28 shrink-0 !rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-4 w-1/5" />
          <div className="skeleton h-4 w-full max-w-md" />
          <div className="skeleton h-4 w-2/3 max-w-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => <div key={i} className="skeleton h-24 !rounded-xl" />)}
      </div>
      <RepoSkeletons />
    </div>
  );
}

export function RepoSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2" role="status" aria-label="Loading repositories">
      {Array.from({ length: count }, (_, i) => <div key={i} className="skeleton h-36 !rounded-xl" />)}
    </div>
  );
}
