import '../styles/Footer.scss'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Кафедра ФКС</h3>
          <p>
            Національний Університет
            "Полтавська політехніка імені Юрія Кондратюка"
          </p>
        </div>
        <div className="footer-copyright">
          <p>
            © {currentYear} Кафедра фізичної культури і спорту.
            Усі права захищено.
          </p>
          <p className="footer-subtext">
            Курсова робота з дисципліни "Веб-програмування та веб-дизайн"
          </p>
        </div>
      </div>
    </footer>
  );
}