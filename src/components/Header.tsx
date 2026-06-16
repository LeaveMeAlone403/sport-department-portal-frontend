import '../styles/Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          {}
          <div className="logo-img">
            <span className="logo-text">ФКС</span>
          </div>
          <h1>Кафедра фізичної культури і спорту</h1>
        </div>
        <nav className="main-nav">
          <ul className="nav-menu">
            <li><a href="#about">Про сайт</a></li>
            <li><a href="#gallery">Галерея</a></li>
            <li><a href="#news">Новини</a></li>
            <li><a href="#contacts">Контакти</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}