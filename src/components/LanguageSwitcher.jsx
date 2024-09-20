
import React, { useState } from 'react';
import Flag from 'react-world-flags'; // For flag icons, or use your own flag images

const languages = [
    { code: 'en', name: 'English', flag: 'US' },
    { code: 'es', name: 'Spanish', flag: 'ES' },
    { code: 'fr', name: 'French', flag: 'FR' },
    { code: 'ru', name: 'Russian', flag: 'RU' },
    // Add more languages with their respective flag codes
];


const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default to the first language
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to handle language selection
    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setDropdownOpen(false);

        // Update Google Translate dropdown
        const googleTranslateDropdown = document.querySelector('.goog-te-combo');
        if (googleTranslateDropdown) {
            googleTranslateDropdown.value = language.code;
            googleTranslateDropdown.dispatchEvent(new Event('change'));
        } else {
            console.error('Google Translate dropdown not found');
        }
    };

    return (
        <div className="App">
            <h1>Custom Google Translate Dropdown with Flags</h1>

            <div className="dropdown rounded-sm" style={{ position: 'relative', width: '140px' }}>
                <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Flag code={selectedLanguage.flag} style={{ width: '20px', marginRight: '8px' }} />
                    {selectedLanguage.name}
                </div>

                {dropdownOpen && (
                    <ul
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            border: '1px solid #ccc',
                            backgroundColor: 'white',
                            listStyle: 'none',
                            padding: '0',
                            margin: '0',
                            zIndex: 10,
                        }}
                    >
                        {languages.map((language) => (
                            <li
                                key={language.code}
                                onClick={() => handleLanguageSelect(language)}
                                style={{
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee',
                                }}
                            >
                                <Flag code={language.flag} style={{ width: '20px', marginRight: '8px' }} />
                                {language.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Hidden Google Translate widget, required for functionality */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
        </div>
    );
}

export default LanguageSwitcher
