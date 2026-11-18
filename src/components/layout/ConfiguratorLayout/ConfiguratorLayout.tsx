import type { ReactNode } from 'react';
import styles from './ConfiguratorLayout.module.css';


type ConfiguratorLayoutProps = {
    children: ReactNode;
    sidebar: ReactNode;
};

export function ConfiguratorLayout({
                                       children,
                                       sidebar,
                                   }: ConfiguratorLayoutProps) {
    return (
        <main className={styles.layout}>
            <section className={styles.viewer}>
                {children}
            </section>

            <aside className={styles.sidebar}>
                {sidebar}
            </aside>
        </main>
    );
}
