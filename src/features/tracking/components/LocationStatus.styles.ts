import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  infoBox: {
    marginTop: 4,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065f46',
  },
  inactiveText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#991b1b',
  },
  subText: {
    fontSize: 13,
    marginTop: 4,
    color: '#374151',
  },
});
