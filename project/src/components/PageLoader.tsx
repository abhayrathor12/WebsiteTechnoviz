/** Shown for a moment while a page's code is downloading. */
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="h-10 w-10 rounded-full border-4 border-[#203f78]/20 border-t-[#203f78] animate-spin" />
  </div>
);

export default PageLoader;
