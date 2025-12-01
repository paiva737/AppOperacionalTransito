import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#111827' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4, color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  fotoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
    color: '#374151',
  },
  fotoPreview: {
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  fotoImage: {
    width: 200,
    height: 140,
    borderRadius: 12,
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonTextPrimary: { color: '#fff', fontWeight: '600' },
  buttonTextSecondary: { color: '#374151', fontWeight: '500' },
});
