import { Route, Routes } from 'react-router-dom';

// component imports
import Header from './components/header/Header';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import User from './components/user/User';
import Survey from './components/survey/Survey';
import SurveyInfo from './components/survey/SurveyInfo';
import Content from './components/content/Content';
import ContentCreate from './components/content/ContentCreate';
import ContentEdit from './components/content/ContentEdit'
import LoyaltyPoint from './components/loyaltyPoint/LoyaltyPoint'
import Revenue from './components/revenue/Revenue';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';
import PageNotFound from './components/pageNotFound/PageNotFound';
import CreateSurvey from './components/survey/createSurvey/CreateSurvey';

export default function App() {
    const isLoggedIn = localStorage.getItem('authToken') != null;
    return (
        <>
            { isLoggedIn ? (
                <>
                    <Navbar />
                    <div className='ml-80'>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='user' element={<User />} />
                            <Route path='survey' element={<Survey />} />
                            <Route path='survey/create' element={<CreateSurvey />} />
                            <Route path='survey/details/:slug' element={<SurveyInfo />} />
                            <Route path='content' element={<Content />} />
                            <Route path='content/create' element={<ContentCreate />} />
                            <Route path='content/edit/:slug' element={<ContentEdit />} />
                            <Route path='loyalty-point' element={<LoyaltyPoint />} />
                            <Route path='revenue' element={<Revenue />} />
                            <Route path='analytics' element={<Analytics />} />
                            <Route path='settings' element={<Settings />} />
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </div>
                </>
            ) : <Login /> }
        </>
    );
}
