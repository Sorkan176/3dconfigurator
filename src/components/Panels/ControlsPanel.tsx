import styles from './ControlsPanel.module.css'
import { useTranslation } from 'react-i18next';
import { useConfiguratorStore } from '../../store/useConfiguratorStore.ts';
import clsx from 'clsx';

const lightPresets = [
    { id: 'warm', color: '#ffb35c' },
    { id: 'neutral', color: '#fff4df' },
    { id: 'cold', color: '#dceaff' },
];

export function ControlsPanel() {
    const { t } = useTranslation();

    const {
        facadeColor,
        lightsOn,
        brightness,
        lightColor,
        setFacadeColor,
        toggleLights,
        setBrightness,
        setLightColor,
    } = useConfiguratorStore();

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    {t('controls.title')}
                </h2>

                <p className={styles.description}>
                    {t('controls.description')}
                </p>
            </header>

            {/* Корпус */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        {t('controls.body')}
                    </h3>
                </div>

                <div className={styles.colorField}>
                    <label
                        htmlFor="facade-color"
                        className={styles.label}
                    >
                        {t('controls.facadeColor')}
                    </label>

                    <input
                        id="facade-color"
                        className={styles.colorInput}
                        type="color"
                        value={facadeColor}
                        onChange={(event) =>
                            setFacadeColor(event.target.value)
                        }
                    />
                </div>
            </section>

            {/* Освещение */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        {t('controls.lighting')}
                    </h3>
                </div>

                <div className={styles.toggleRow}>
                    <label
                        htmlFor="window-lights"
                        className={styles.toggleLabel}
                    >
                        {t('controls.windowLights')}
                    </label>

                    <input
                        id="window-lights"
                        className={styles.checkbox}
                        type="checkbox"
                        checked={lightsOn}
                        onChange={toggleLights}
                    />
                </div>

                <div
                    className={clsx(
                        styles.field,
                        !lightsOn && styles.disabled
                    )}
                >
                    <div className={styles.sectionHeader}>
                        <label
                            htmlFor="brightness"
                            className={styles.label}
                        >
                            {t('controls.brightness')}
                        </label>

                        <span className={styles.value}>
              {Math.round(brightness * 100)}%
            </span>
                    </div>

                    <input
                        id="brightness"
                        className={styles.range}
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={brightness}
                        disabled={!lightsOn}
                        onChange={(event) =>
                            setBrightness(Number(event.target.value))
                        }
                    />
                </div>

                <div
                    className={clsx(
                        styles.field,
                        !lightsOn && styles.disabled
                    )}
                >
          <span className={styles.label}>
            {t('controls.lightColor')}
          </span>

                    <div className={styles.colorPresets}>
                        {lightPresets.map((preset) => (
                            <button
                                key={preset.id}
                                type="button"
                                className={clsx(
                                    styles.colorPreset,
                                    lightColor === preset.color &&
                                    styles.colorPresetActive
                                )}
                                style={{
                                    '--preset-color': preset.color,
                                } as React.CSSProperties}
                                aria-label={t(
                                    `controls.lightTemperature.${preset.id}`
                                )}
                                aria-pressed={lightColor === preset.color}
                                disabled={!lightsOn}
                                title={t(
                                    `controls.lightTemperature.${preset.id}`
                                )}
                                onClick={() => setLightColor(preset.color)}
                            />
                        ))}
                    </div>

                    <div className={styles.colorField}>
                        <label
                            htmlFor="light-color"
                            className={styles.label}
                        >
                            {t('controls.lightTemperature.custom')}
                        </label>

                        <input
                            id="light-color"
                            className={styles.colorInput}
                            type="color"
                            value={lightColor}
                            disabled={!lightsOn}
                            onChange={(event) =>
                                setLightColor(event.target.value)
                            }
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
