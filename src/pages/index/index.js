import styles from './index.css';
import SignInScreen from './SignInScreen';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <SignInScreen />
    </div>
  );
}
