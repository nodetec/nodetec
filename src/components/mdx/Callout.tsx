export default function Callout({
  type,
  children,
}: {
  type: "warning" | "info" | "tip" | "error" | "success";
  children: React.ReactNode;
}) {
  const getEmoji = () => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "tip":
        return "💡";
      case "error":
        return "🚫";
      case "success":
        return "✅";
    }
  };

  return (
    <div className="callout my-6 flex w-full rounded-md">
      {type === "warning" && (
        <div className="flex gap-2 rounded-md border border-yellow-300 bg-yellow-100 p-3 text-yellow-900 dark:border-yellow-600/50 dark:bg-yellow-700/40 dark:text-yellow-200">
          <span className="select-none">{getEmoji()}</span>
          <span>{children}</span>
        </div>
      )}
      {type === "info" && (
        <div className="flex gap-2 rounded-md border border-blue-300 bg-blue-100 p-3 text-blue-900 dark:border-blue-600/50 dark:bg-blue-700/40 dark:text-blue-200">
          <span className="select-none">{getEmoji()}</span>
          <span>{children}</span>
        </div>
      )}
      {type === "tip" && (
        <div className="flex gap-2 rounded-md border border-purple-300 bg-purple-100 p-3 text-purple-900 dark:border-purple-600/50 dark:bg-purple-700/40 dark:text-purple-200">
          <span className="select-none">{getEmoji()}</span>
          <span>{children}</span>
        </div>
      )}
      {type === "error" && (
        <div className="flex gap-2 rounded-md border border-red-300 bg-red-100 p-3 text-red-900 dark:border-red-600/50 dark:bg-red-700/40 dark:text-red-200">
          <span className="select-none">{getEmoji()}</span>
          <span>{children}</span>
        </div>
      )}
      {type === "success" && (
        <div className="flex gap-2 rounded-md border border-green-300 bg-green-100 p-3 text-green-900 dark:border-green-600/50 dark:bg-green-700/40 dark:text-green-200">
          <span className="select-none">{getEmoji()}</span>
          <span>{children}</span>
        </div>
      )}
    </div>
  );
}
