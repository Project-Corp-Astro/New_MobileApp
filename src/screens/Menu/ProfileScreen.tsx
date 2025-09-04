import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Design System
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import {
  designTokens,
  typography,
  spacing,
  colors,
  radius,
  shadows,
} from '../../components/DesignSystem/designTokens';

// Components
import { BaseScreen } from '../../components/menusection/BaseScreen';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const ProfileScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  const [userData, setUserData] = React.useState({
    name: '',
    phone: '',
    gender: '',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <BaseScreen>
      <SafeAreaView style={styles.container}>
        <CorporateProfessionalHeader
          title="Complete Your Profile"
          showBackButton
          onBackPress={handleBack}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color="#ccc" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="pencil" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              {/* Name */}
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={colors.text.secondary}
                value={userData.name}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, name: text }))
                }
              />

              {/* Phone */}
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                placeholderTextColor={colors.text.secondary}
                keyboardType="phone-pad"
                value={userData.phone}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, phone: text }))
                }
              />

              {/* Gender */}
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Select"
                placeholderTextColor={colors.text.secondary}
                value={userData.gender}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, gender: text }))
                }
              />
               <Text style={styles.inputLabel}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="01/10/2000"
                placeholderTextColor={colors.text.secondary}
                value={userData.gender}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, gender: text }))
                }
              />
              <Text style={styles.inputLabel}>Birth Time</Text>
              <TextInput
                style={styles.input}
                placeholder="01:10"
                placeholderTextColor={colors.text.secondary}
                value={userData.gender}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, gender: text }))
                }
              />
              <Text style={styles.inputLabel}>Birth Place</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your birth place"
                placeholderTextColor={colors.text.secondary}
                value={userData.gender}
                onChangeText={(text) =>
                  setUserData((prev) => ({ ...prev, gender: text }))
                }
              />
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.void,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.xl,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.brand.primary,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface.primary,
  },
  card: {
    width: '100%',
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: colors.surface.secondary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    color: colors.text.primary,
    ...typography.body,
  },
  saveButton: {
    width: 170,
    minHeight: 28,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.brand.primary,
    backgroundColor: colors.brand.primary,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.subtle,
  },
  saveButtonText: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    fontWeight: '400',
  },
});

export default ProfileScreen;
