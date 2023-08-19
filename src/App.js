// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import SnackbarComponent from 'components/Snackbar';
import LoaderSlider from 'components/LoaderSlider';
import LoderComponent from 'components/Loder';
import './app.css';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <LoderComponent />
        <SnackbarComponent />
        <LoaderSlider />
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
