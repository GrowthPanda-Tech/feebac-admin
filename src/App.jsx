import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/user/User";
import UserInfo from "./components/user/UserInfo";
import Survey from "./components/survey/Survey";
import SurveyInfo from "./components/survey/SurveyInfo";
import CreateSurvey from "./components/survey/createSurvey/CreateSurvey";
import SurveyReview from "./components/survey/reviewSurvey/SurveyReview";
import Content from "./components/content/Content";
import ContentCreate from "./components/content/ContentCreate";
import ContentEdit from "./components/content/ContentEdit";
import NewsTable from "./components/news/NewsTable";
import NewsCreate from "./components/news/NewsCreate";
import NewsEdit from "./components/news/NewsEdit";
// import Revenue from "./components/revenue/Revenue";
// import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ProfileUpdate from "./components/header/ProfileUpdate";
import AddQuestions from "./components/survey/createSurvey/AddQuestions";
import SurveyEdit from "./components/survey/surveyEdit/SurveyEdit";
import Loyalty from "./components/loyaltyPoint/Loyalty";
import RedeemInfo from "./components/loyaltyPoint/RedeemInfo";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function App() {
    const isLoggedIn = localStorage.getItem("authToken");

    if (!isLoggedIn) {
        return <Login />;
    }

    const routes = [
        { path: "/", element: <Dashboard /> },
        { path: "user", element: <User /> },
        { path: "user/:slug", element: <UserInfo /> },
        { path: "profile-update", element: <ProfileUpdate /> },
        { path: "survey", element: <Survey /> },
        { path: "survey/create", element: <CreateSurvey /> },
        {
            path: "survey/create/add-questions/:slug",
            element: <AddQuestions />,
        },
        { path: "survey/details/:slug", element: <SurveyInfo /> },
        { path: "survey/review/:slug", element: <SurveyReview /> },
        { path: "survey/edit-survey/:slug", element: <SurveyEdit /> },
        { path: "content", element: <Content /> },
        { path: "content/create", element: <ContentCreate /> },
        { path: "content/edit/:slug", element: <ContentEdit /> },
        { path: "news", element: <NewsTable /> },
        { path: "news/create", element: <NewsCreate /> },
        { path: "news/edit/:slug", element: <NewsEdit /> },
        { path: "insights", element: <Insights /> },
        { path: "loyalty-point", element: <Loyalty /> },
        { path: "loyalty-point/redeem/:slug", element: <RedeemInfo /> },
        // { path: "revenue", element: <Revenue /> },
        // { path: "analytics", element: <Analytics /> },
        { path: "settings", element: <Settings /> },
        { path: "*", element: <PageNotFound /> },
    ];

    return (
        <>
            <div className="hidden md:block">
                <Navbar />
            </div>
            <div className="md:ml-80">
                <SkeletonTheme baseColor="#D2D5D4" highlightColor="#BBC4C2">
                    <Header />
                    <main className="p-10">
                        <Routes>
                            {routes.map(({ path, element }, index) => (
                                <Route
                                    path={path}
                                    element={element}
                                    key={index}
                                />
                            ))}
                        </Routes>
                    </main>
                </SkeletonTheme>
            </div>
        </>
    );
}
