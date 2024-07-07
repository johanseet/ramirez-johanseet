import styles from '../styles/Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Sobre Nosotros</h3>
          <p>Conozca más sobre nuestra empresa y nuestros servicios.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>Email: info@anunciapanama.com</p>
          <p>Teléfono: +507 123 4567</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Síguenos</h3>
          <div className={styles.socialIcons}>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2024 Anuncia Panamá. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
