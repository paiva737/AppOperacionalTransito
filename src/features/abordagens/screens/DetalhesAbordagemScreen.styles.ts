import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  bigImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  headerCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f9fafb',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#9ca3af',
  },
  headerMetaRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  headerMetaChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#1f2937',
    marginRight: 8,
  },
  headerMetaText: {
    fontSize: 11,
    color: '#e5e7eb',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 15,
    color: '#111827',
  },
  sectionValueMuted: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#4b5563',
  },
  editButtonText: {
    color: '#f9fafb',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#f9fafb',
    fontWeight: '600',
    fontSize: 14,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
});
