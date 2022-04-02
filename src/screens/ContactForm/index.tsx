import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, View} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import Assets from '~assets';
import {Button, DummyFlatList, Gap, Picture} from '~components/atoms';
import {FluidButton, Header} from '~components/molecules';
import {Canvas} from '~components/organisms';
import PhraseInput from '~components/organisms/PhraseInput';
import spaces from '~constants/spaces';
import {diagonalDp, isIos} from '~helpers';
import {useContactDetail, useNavigate} from '~hooks';
import {dispatchContacts} from '~redux/actions';
import {IContact, RootStackParamList} from '~types';
import styles from './styles';

const ContactForm = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ContactForm'>>();
  const {id} = route?.params || {};

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userDetail = useContactDetail(id);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    getValues,
  } = useForm<IContact>({
    defaultValues: {
      name: '',
      bio: '',
      born: '',
      email: '',
      photo: '',
    },
    mode: 'onChange',
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      editSetter();
    }, 400);
  }, [id]);

  const editSetter = () => {
    if (!id) return;
    setValue('bio', userDetail?.bio);
    setValue('born', userDetail?.born, {shouldValidate: true});
    setValue('email', userDetail?.email || '');
    setValue('name', userDetail?.name || '');
    setValue('photo', userDetail?.photo, {shouldValidate: true});
  };

  // FIX
  const handleConfirm = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayFormatted = day < 10 ? `0${day}` : day;
    const monthFormatted = month < 10 ? `0${month}` : month;
    setValue('born', `${dayFormatted}/${monthFormatted}/${year}`, {
      shouldValidate: true,
    });
    setIsDatePickerVisible(false);
  };

  const hideDatePicker = () => setIsDatePickerVisible(false);

  // FIX
  const onSubmit = (data: IContact) => {
    !!id
      ? dispatch(dispatchContacts('UpdateContact', {...data, id}))
      : dispatch(
          dispatchContacts('AddContact', {
            ...data,
            id: `${new Date().getTime()}`,
          }),
        );
    navigation.goBack();
  };

  const onDelteConfirm = () => {
    if (!id) return;
    navigation.pop(2);
    dispatch(dispatchContacts('DeleteContact', id));
  };

  const onPickPhoto = () =>
    launchImageLibrary({mediaType: 'photo'}, (image: ImagePickerResponse) => {
      if (image.didCancel) return;
      const {uri} = !!image?.assets ? image?.assets[0] : {uri: ''};
      setValue('photo', uri || '', {shouldValidate: true});
    });

  const showDatePicker = () => setIsDatePickerVisible(true);

  return (
    <Canvas>
      <Header
        label={!!id ? 'Edit Contact' : 'New Contact'}
        extraAction={!!id}
        actionPress={onDelteConfirm}
      />
      <KeyboardAvoidingView
        behavior={isIos ? 'height' : 'padding'}
        keyboardVerticalOffset={40}>
        <DummyFlatList usePadding>
          <Gap vertical={spaces.medium} />
          <View style={styles.photos}>
            <View style={styles.photoContainer}>
              <Picture
                borderRadius={diagonalDp(128)}
                uri={getValues('photo')}
              />
              <Button style={styles.photoPicker} onPress={onPickPhoto}>
                <Assets.svg.Camera />
              </Button>
            </View>
          </View>
          <Gap vertical={spaces.xlarge} />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Please provide the name'},
            }}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                autoCapitalize="words"
                label="Name"
                placeholder="What do we call it?"
                maxLength={40}
                onChangeText={onChange}
                value={value}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />
          <Gap vertical={spaces.semiLarge} />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please provide the email address',
              },
              // FIX
              validate: (str: number | string | undefined) =>
                !str ||
                `${str}`?.match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
                ) !== null ||
                'Please provide a valid email address.',
            }}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                label="Email"
                placeholder="Where to send the messages?"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                maxLength={50}
                value={value}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
          />
          <Gap vertical={spaces.semiLarge} />
          <PhraseInput
            label="Date of Birth"
            placeholder="What is the age?"
            passive
            passivePress={showDatePicker}
            value={getValues('born')}
          />
          <Gap vertical={spaces.semiLarge} />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                label="Bio"
                placeholder={`What's going on in their mind?`}
                multiline
                maxLength={500}
                onChangeText={onChange}
                value={value}
                error={!!errors.bio?.message}
                errorMessage={errors.bio?.message}
              />
            )}
            name="bio"
          />
          <Gap vertical={spaces.semiLarge} />
        </DummyFlatList>
      </KeyboardAvoidingView>
      <FluidButton
        onPress={handleSubmit(onSubmit)}
        style={styles.floatButton}
        // disabled={isValid}
      >
        {!!id ? 'Update Contact' : 'Save Contact'}
      </FluidButton>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </Canvas>
  );
};

export default ContactForm;
