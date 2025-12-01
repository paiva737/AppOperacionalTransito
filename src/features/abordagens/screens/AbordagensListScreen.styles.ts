import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  listContent: { gap: 12, paddingBottom: 24 },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  thumb: {
    width: 72,
    height: 48,
    borderRadius: 8,
    marginLeft: 12,
    backgroundColor: '#e5e7eb',
  },
  placa: { fontSize: 18, fontWeight: '700', marginBottom: 4, color: '#111827' },
  observacoes: { fontSize: 14, marginBottom: 4, color: '#374151' },
  meta: { fontSize: 12, color: '#4b5563', marginTop: 2 },
  metaTime: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
  emptyText: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '85%',
    height: '60%',
    borderRadius: 12,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#111827',
  },
  modalCloseText: {
    color: '#f9fafb',
    fontWeight: '600',
    fontSize: 14,
  },
});
