// styles/sharedStyles.js
import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2A32',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    width: '100%',
  },
  toggleText: {
    color: '#e67000',
    marginTop: 6,
  },
  btn: {
    backgroundColor: '#e67000',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e67000',
    marginBottom: 16,
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  link: {
    textAlign: 'center',
    color: '#e67000',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 12,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fdf6f0',
  },
  
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  
  headerImg: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 36,
  },
  
  form: {
    marginBottom: 20,
  },
  
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e67000',
    textAlign: 'center',
  },
  
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
});

export default sharedStyles;
