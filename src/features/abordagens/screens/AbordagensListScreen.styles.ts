import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  listContent: { gap: 12 },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  placa: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  observacoes: { fontSize: 14, marginBottom: 4 },
  meta: { fontSize: 12, color: '#6b7280' },
  emptyText: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
});
