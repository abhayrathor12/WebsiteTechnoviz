import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFoundPage: React.FC = () => (
  <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-24">
    <SEO
      title="Page Not Found | Technoviz Automation"
      description="The page you are looking for could not be found."
      noindex
    />
    <div className="text-center max-w-xl">
      <p className="text-6xl font-bold text-[#ddaf26] mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#203f78] mb-4">Page not found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for may have moved or no longer exists.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="bg-[#203f78] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ddaf26] transition-colors">
          Go to Home
        </Link>
        <Link to="/blogs" className="border border-[#203f78] text-[#203f78] px-6 py-3 rounded-full font-semibold hover:bg-[#203f78] hover:text-white transition-colors">
          Read our Blogs
        </Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
