import CreateLinkForm from "../CreateLinkForm/CreateLinkForm";
import UrlHistory from "../UrlHistory/UrlHistory";
import QueryContext from "../../contexts/QueryContext";
import useDashboard from "./useDashboard";
import FadeIn from "../FadeIn";

const Dashboard = () => {
  const urlsQuery = useDashboard();

  return (
    <FadeIn>
      <h1 className="p-4 text-center text-4xl font-bold text-white lg:text-6xl">
        Welcome To Turl
      </h1>
      <QueryContext.Provider value={urlsQuery}>
        <CreateLinkForm />
        <UrlHistory />
      </QueryContext.Provider>
    </FadeIn>
  );
};

export default Dashboard;
