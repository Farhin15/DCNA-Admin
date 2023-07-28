// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import SnackbarComponent from 'components/Snackbar';
import LoaderSlider from 'components/LoaderSlider';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <SnackbarComponent />
        <LoaderSlider />
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
