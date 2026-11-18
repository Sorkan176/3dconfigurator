import {Header} from "../components/layout/Header/Header.tsx";
import { ConfiguratorLayout } from '../components/layout/ConfiguratorLayout/ConfiguratorLayout.tsx';
import { ControlsPanel } from '../components/Panels/ControlsPanel.tsx';
import styles from './App.module.css';
import {ViewerPanel} from "../components/Panels/ViewerPanel.tsx";


function App() {
    return (
        <div className={styles.app}>
            <Header />

            <ConfiguratorLayout sidebar={<ControlsPanel />}>
                <div className={styles.scene}>
                    <ViewerPanel />
                </div>
            </ConfiguratorLayout>
        </div>
    );
}

export default App;
