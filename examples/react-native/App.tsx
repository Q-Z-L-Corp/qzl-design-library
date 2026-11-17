import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  Accordion,
  Alert,
  Badge,
  BottomSheet,
  Button,
  Carousel,
  Card,
  DataTable,
  Divider,
  FileUploadInput,
  HelperText,
  Indicator,
  Input,
  MarkdownEditor,
  Popover,
  SegmentedButtons,
  SelectCard,
  SideSheet,
  StarRating,
  SteppedProgressBar,
  Stepper,
  Switch,
  Tag,
  Typography
} from '@qzl/react-native';
import { QrScanner } from '@qzl/react-native/expo/qr-scanner';
import { themes, type ThemeName } from '@qzl/tokens';

const linkRows = [
  { destination: 'example.com/spring', clicks: 1248 },
  { destination: 'example.com/guide', clicks: 852 }
];

const linkColumns = [
  { key: 'destination', header: 'Destination', render: (row: typeof linkRows[number]) => row.destination, sortValue: (row: typeof linkRows[number]) => row.destination },
  { key: 'clicks', header: 'Clicks', render: (row: typeof linkRows[number]) => row.clicks, sortValue: (row: typeof linkRows[number]) => row.clicks }
];

export default function App() {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [projectName, setProjectName] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState('# Campaign notes\n\n- Check the destination\n- Review before sharing');
  const [scannedValue, setScannedValue] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [density, setDensity] = useState('comfortable');
  const [plan, setPlan] = useState('team');
  const [rating, setRating] = useState(4);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const colors = themes[theme];
  const setupSteps = [{ label: 'Profile' }, { label: 'Security' }, { label: 'Review' }];

  return (
    <ScrollView contentContainerStyle={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>QZL DESIGN LIBRARY</Text>
          <Text style={[styles.title, { color: colors.text }]}>Native foundations</Text>
        </View>
        <Button
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          variant="secondary"
          size="sm"
          theme={theme}
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </View>
      <Card theme={theme} style={styles.card}>
        <View style={styles.cardHeading}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Create a workspace</Text>
          <Badge theme={theme} variant="success">Protected</Badge>
        </View>
        <Text style={[styles.description, { color: colors.textMuted }]}>
          Shared tokens, React Native controls, and accessible interactions.
        </Text>
        <Text style={[styles.label, { color: colors.text }]}>Workspace name</Text>
        <Input
          theme={theme}
          value={projectName}
          onChangeText={setProjectName}
          placeholder="e.g. Product team"
          accessibilityLabel="Workspace name"
          returnKeyType="done"
        />
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Email updates</Text>
            <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
              {notifications ? 'Updates are on.' : 'Updates are off.'}
            </Text>
          </View>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            theme={theme}
            accessibilityLabel="Email updates"
          />
        </View>
        <Button
          title="Create workspace"
          theme={theme}
          disabled={!projectName.trim()}
          onPress={() => setMessage(`Workspace “${projectName.trim()}” is ready.`)}
        />
        {!!message && <Text accessibilityLiveRegion="polite" style={[styles.message, { color: colors.success }]}>{message}</Text>}
      </Card>
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Navigation & reporting</Text>
          <Accordion title="Sharing guidance" theme={theme}>
            <Text style={{ color: colors.textMuted }}>Review destinations before you share a link.</Text>
          </Accordion>
          <DataTable
            caption="Shared link performance"
            rows={linkRows}
            columns={linkColumns}
            getRowKey={(row) => row.destination}
            theme={theme}
          />
        </Card>
        <Card theme={theme} style={styles.card}>
          <Typography variant="heading-2" theme={theme}>More component patterns</Typography>
          <Typography variant="body" theme={theme}>Shared patterns adapt to React Native controls and platform accessibility.</Typography>
          <Divider theme={theme} />
          <HelperText theme={theme}>This helper text stays close to the content it describes.</HelperText>
          <Indicator label="All systems operational" status="success" theme={theme} />
          <Tag variant="info" theme={theme}>Team workspace</Tag>
          <Carousel
            theme={theme}
            index={slideIndex}
            onIndexChange={setSlideIndex}
            slides={[
              <Text key="overview" style={{ color: colors.text }}>Workspace overview</Text>,
              <Text key="sharing" style={{ color: colors.text }}>Sharing preferences</Text>,
              <Text key="security" style={{ color: colors.text }}>Security settings</Text>
            ]}
          />
          <SegmentedButtons
            label="Display density"
            value={density}
            onValueChange={setDensity}
            options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]}
            theme={theme}
          />
          <SelectCard
            label="Workspace plan"
            value={plan}
            onValueChange={setPlan}
            options={[{ value: 'individual', title: 'Individual', description: 'For personal projects' }, { value: 'team', title: 'Team', description: 'For collaboration' }]}
            theme={theme}
          />
          <StarRating label="Satisfaction" value={rating} onValueChange={setRating} theme={theme} />
          <SteppedProgressBar label="Project setup progress" steps={setupSteps} activeStep={activeStep} theme={theme} />
          <Stepper label="Setup steps" steps={setupSteps} activeStep={activeStep} onStepChange={setActiveStep} theme={theme} />
          <FileUploadInput
            label="Simulate selecting a file"
            onPress={() => setSelectedFiles(['report.pdf'])}
            selectedFiles={selectedFiles}
            helperText="Demo only: connect a native document picker in your app."
            theme={theme}
          />
          <Popover trigger="What is this?" theme={theme}>
            <Text style={{ color: colors.text }}>Popover content stays near the control that explains it.</Text>
          </Popover>
          <View style={styles.settingRow}>
            <Button title="Open bottom sheet" variant="secondary" theme={theme} onPress={() => setBottomSheetOpen(true)} />
            <Button title="Open side sheet" variant="secondary" theme={theme} onPress={() => setSideSheetOpen(true)} />
          </View>
          <BottomSheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen} title="Share link" theme={theme}>
            <Text style={{ color: colors.text }}>Choose how you would like to share this link.</Text>
          </BottomSheet>
          <SideSheet open={sideSheetOpen} onOpenChange={setSideSheetOpen} title="Workspace settings" theme={theme}>
            <Text style={{ color: colors.text }}>Manage preferences for this workspace.</Text>
          </SideSheet>
        </Card>
        <Card theme={theme} style={styles.card}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Writing & scanning</Text>
          <MarkdownEditor label="Campaign notes" value={notes} onValueChange={setNotes} preview theme={theme} />
          <QrScanner onScan={setScannedValue} theme={theme} />
          {scannedValue.length > 0 && (
            <Alert variant="info" theme={theme}>
              Scanned value (not opened): {scannedValue}
            </Alert>
          )}
        </Card>
      <Text style={[styles.footer, { color: colors.textSoft }]}>React Native · 44 shared components for iOS and Android</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 64, paddingBottom: 28, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 25 },
  eyebrow: { marginBottom: 6, fontSize: 10, fontWeight: '700', letterSpacing: 1.1 },
  title: { fontSize: 25, fontWeight: '700', letterSpacing: -0.5 },
  card: { gap: 13 },
  cardHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  description: { marginBottom: 4, fontSize: 13, lineHeight: 19 },
  label: { fontSize: 12, fontWeight: '600' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 8 },
  settingCopy: { flex: 1, gap: 3 },
  settingTitle: { fontSize: 12, fontWeight: '600' },
  settingDescription: { fontSize: 11 },
  message: { fontSize: 12, fontWeight: '600' },
  footer: { marginTop: 18, fontSize: 10, textAlign: 'center' }
});
