// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import SuccessSnackbar from 'components/SuccessSnackbar';
import LoaderSlider from 'components/LoaderSlider';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <SuccessSnackbar />
        <LoaderSlider />
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
