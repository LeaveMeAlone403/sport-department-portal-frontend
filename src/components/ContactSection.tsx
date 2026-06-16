import {useState} from 'react';
import {api} from '../api/apiClient';
import type {ContactFormData} from '../types';
import '../styles/ContactSection.scss';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', message: ''}
  );
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | ''; text: string }>({type: '', text: ''}
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({type: '', text: ''});

    const result = await api.submitContactForm(formData);

    if (result.success) {
      setStatus({type: 'success', text: 'Повідомлення успішно відправлено!'});
      setFormData({name: '', email: '', message: ''});
    } else {
      setStatus({type: 'error', text: result.error || 'Сталася помилка.'});
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contacts" className="section">
      <div className="container">
        <h2 className="section-title">Контакти</h2>
        <div className="contacts-wrapper">

          <div className="contact-form-container">
            <h3>Зворотній зв'язок</h3>
            <p className="contact-subtitle">
              Маєте питання щодо секцій? Напишіть нам!
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ваше ім'я</label>
                <input
                  id="name" type="text" required
                  value={formData.name} onChange={e => setFormData(
                    {...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Ваш Email</label>
                <input
                  id="email" type="email" required
                  value={formData.email} onChange={e => setFormData(
                    {...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Повідомлення</label>
                <textarea
                  id="message" rows={5} required
                  value={formData.message} onChange={e => setFormData(
                    {...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-100"
                      disabled={isSubmitting}>
                {isSubmitting ? 'Відправка...' : 'Надіслати повідомлення'}
              </button>

              {status.text && (
                <div className={`form-alert ${status.type === 'success' 
                  ? 'alert-success' : 'alert-error'}`}>
                  {status.text}
                </div>
              )}
            </form>
          </div>

          <div className="map-container">
            <iframe
              title="Національний університет Полтавська політехніка"
              width="100%"
              height="100%"
              src="https://maps.google.com/maps?q=Національний%20університет
              %20Полтавська%20політехніка%20імені%20Юрія%20Кондратюка&t=
              &z=17&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}