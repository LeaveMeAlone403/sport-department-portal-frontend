import '../styles/AboutSection.scss'

export default function AboutSection() {
  return (
    <section id="about" className="section bg-light">
      <div className="container">
        <h2 className="section-title">Про сайт</h2>
        <div className="about-content">
          <p className="about-text">
            Ласкаво просимо до інформаційного порталу<br/>
            <strong>Кафедри фізичної культури і спорту</strong>.
            <br/>Наша мета — залучення студентів до здорового
            способу життя, організація спортивно-масової роботи
            та підготовка збірних команд ЗВО до змагань різних рівнів.
          </p>
          <div className="about-stats-grid">
            <div className="stat-card">
              <h3>15+</h3>
              <p>Спортивних секцій</p>
            </div>
            <div className="stat-card">
              <h3>3</h3>
              <p>Спортзали</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Нагород за рік</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}