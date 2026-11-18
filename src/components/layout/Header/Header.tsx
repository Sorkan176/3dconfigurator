import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import clsx from "clsx";


export function Header() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: 'ru' | 'en') => {
        i18n.changeLanguage(language);
    };

    const language = i18n.resolvedLanguage?.startsWith('en')
        ? 'en'
        : 'ru';

    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.logo}>P</div>

                <div>
                    <div className={styles.brandName}>PANEL / LIGHT</div>
                    <div className={styles.brandDescription}>
                        {t('app.title')}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <div className={styles.language}>
                    <span>{t('app.language')}: </span>

                    <button
                        className={clsx(styles.language__button, language === 'ru' && styles.language__button_active)}
                        onClick={() => changeLanguage('ru')}>
                        RU
                    </button>

                    <button
                        className={clsx(styles.language__button, language === 'en' && styles.language__button_active)}
                        onClick={() => changeLanguage('en')}>
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
}
