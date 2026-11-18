import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfiguratorScene } from './ConfiguratorScene.tsx';
import styles from './ViewerPanel.module.css';


export function ViewerPanel() {
    const { t } = useTranslation();
    const [resetSignal, setResetSignal] = useState(0);

    const handleResetCamera = () => {
        setResetSignal((current) => current + 1);
    };

    return (
        <section className={styles.viewer}>
            <header className={styles.header}>
                <div className={styles.heading}>
                    <h2 className={styles.title}>
                        {t('viewer.title')}
                    </h2>

                    <p className={styles.description}>
                        {t('viewer.description')}
                    </p>
                </div>

                <div className={styles.headerActions}>
                    <button
                        type="button"
                        className={styles.resetButton}
                        onClick={handleResetCamera}
                        aria-label={t('viewer.resetCamera')}
                        title={t('viewer.resetCamera')}
                    >
                        <span aria-hidden="true">↺</span>
                        {t('viewer.resetCamera')}
                    </button>

                </div>
            </header>

            <div className={styles.canvas}>
                <ConfiguratorScene resetSignal={resetSignal} />

                <div className={styles.hint}>
                    <span>{t('viewer.hints.rotate')}</span>
                    <span className={styles.hintDivider}>·</span>
                    <span>{t('viewer.hints.zoom')}</span>
                    <span className={styles.hintDivider}>·</span>
                    <span>{t('viewer.hints.pan')}</span>
                </div>
            </div>

            <footer className={styles.footer}>
                <span>{t('viewer.footer')}</span>
            </footer>
        </section>
    );
}
