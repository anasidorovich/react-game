import { useThemeSwitcher } from 'react-css-theme-switcher';

const Component = () => {
  const { switcher, themes, currentTheme, status } = useThemeSwitcher();
  const [theme, setTheme] = React.useState(false);

  const onChangeTheme = (e) => {
     const theme = e.target.innerHTML;
        if (theme === 'Cats') {
          setTheme("dark");
        } else {
          setTheme("primary");
        }

  };

  return (
    <div>
      <h2>Current theme: {currentTheme}</h2>
      <button onClick={toggleDarkMode} />
    </div>
  );
};