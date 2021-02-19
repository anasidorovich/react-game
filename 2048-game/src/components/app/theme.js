import { useThemeSwitcher } from 'react-css-theme-switcher';

const Component = () => {
  const { switcher, themes, currentTheme, status } = useThemeSwitcher();
  const [theme, setTheme] = React.useState(false);

  if (status === 'loading') {
    return <div>Loading styles...</div>;
  }

  const toggleDarkMode = () => {
    setIsDarkMode(previous => {
      switcher({ theme: previous ? themes.light : themes.dark });
      return !previous;
    });
  };

  return (
    <div>
      <h2>Current theme: {currentTheme}</h2>
      <button onClick={toggleDarkMode} />
    </div>
  );
};