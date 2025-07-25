import { type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { Text } from '@actual-app/components/text';
import { View } from '@actual-app/components/view';

import * as Platform from 'loot-core/shared/platform';

import {
  Modal,
  ModalCloseButton,
  ModalHeader,
} from '@desktop-client/components/common/Modal';

type KeyIconProps = {
  shortcut: string;
  style?: CSSProperties;
};

type GroupHeadingProps = {
  group: string;
};

type ShortcutProps = {
  shortcut: string;
  description: string;
  meta?: string;
  shift?: boolean;
  style?: CSSProperties;
};

function KeyIcon({ shortcut, style }: KeyIconProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #000',
        borderRadius: 8,
        minWidth: 30,
        minHeight: 30,
        filter: 'drop-shadow(1px 1px)',
        padding: 5,
        ...style,
      }}
    >
      {shortcut}
    </div>
  );
}

function GroupHeading({ group }: GroupHeadingProps) {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      {group}:
    </Text>
  );
}

function Shortcut({
  shortcut,
  description,
  meta,
  shift,
  style,
}: ShortcutProps) {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 5,
        marginLeft: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: 10,
          }}
        >
          {shift && (
            <>
              <KeyIcon shortcut="Shift" />
              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                +
              </Text>
            </>
          )}
          {meta && (
            <>
              <KeyIcon shortcut={meta} />
              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                +
              </Text>
            </>
          )}
          <KeyIcon shortcut={shortcut} style={style} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 300,
        }}
      >
        {description}
      </div>
    </div>
  );
}

export function KeyboardShortcutModal() {
  const location = useLocation();
  const { t } = useTranslation();
  const onBudget = location.pathname.startsWith('/budget');
  const onAccounts = location.pathname.startsWith('/accounts');
  const ctrl = Platform.OS === 'mac' ? '⌘' : 'Ctrl';

  return (
    <Modal name="keyboard-shortcuts">
      <ModalHeader
        title={t('Keyboard shortcuts')}
        rightContent={<ModalCloseButton onPress={onClose} />}
      />
      <View
        style={{
          overflow: 'hidden',
          backgroundColor: theme.tableBackground,
          color: theme.pageText,
          paddingBottom: 5,
        }}
      >
        <ModalDescription isAlertModal style={{ paddingBottom: 30 }}>
          <View
            style={{
              overflow: 'auto',
              maxHeight: 400,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>
              <Trans>General</Trans>
            </Text>
            <KeyboardShortcut
              shortcut="?"
              description={t('Open the help menu')}
            />
            <KeyboardShortcut
              shortcut={ctrl + '+K'}
              description={t('Open the Command Palette')}
            />
            <KeyboardShortcut
              shortcut={ctrl + '+O'}
              description={t('Close the current budget and open another')}
            />
            <KeyboardShortcut
              shortcut={ctrl + '+Shift+P'}
              description={t('Toggle the privacy filter')}
            />
            <KeyboardShortcut
              shortcut={ctrl + '+Z'}
              description={t('Undo the last change')}
            />
            <KeyboardShortcut
              shortcut={ctrl + '+Shift+Z'}
              description={t('Redo the last undone change')}
            />

            {onBudget && (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <Trans>Budget page</Trans>
                </Text>
                <KeyboardShortcut
                  shortcut="0"
                  description={t('View current month')}
                />
                <KeyboardShortcut
                  shortcut="←"
                  description={t('View previous period')}
                />
                <KeyboardShortcut
                  shortcut="→"
                  description={t('View next period')}
                />
              </>
            )}

            {onAccounts && (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <Trans>Account page</Trans>
                </Text>
                <KeyboardShortcut
                  shortcut="Enter"
                  description={t('Move down when editing')}
                />
                <KeyboardShortcut
                  shortcut="Shift+Enter"
                  description={t('Move up when editing')}
                />
                <KeyboardShortcut
                  shortcut={ctrl + '+I'}
                  description={t('Import transactions')}
                />
                <KeyboardShortcut
                  shortcut={ctrl + '+B'}
                  description={t('Bank sync')}
                />
                <KeyboardShortcut
                  shortcut="F"
                  description={t('Filter to the selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="D"
                  description={t('Delete the selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="A"
                  description={t('Set account for selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="P"
                  description={t('Set payee for selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="N"
                  description={t('Set notes for selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="C"
                  description={t('Set category for selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="L"
                  description={t('Toggle cleared for selected transactions')}
                />
                <KeyboardShortcut
                  shortcut="S"
                  description={t(
                    'Link or view schedule for selected transactions',
                  )}
                />
                <KeyboardShortcut
                  shortcut={ctrl + '+A'}
                  description={t('Select all transactions')}
                />
                <KeyboardShortcut
                  shortcut="Shift+Tab"
                  description={t('Move left when editing')}
                />
                <KeyboardShortcut
                  shortcut="Tab"
                  description={t('Move right when editing')}
                />
                <KeyboardShortcut
                  shortcut="T"
                  description={t('Add a new transaction')}
                />
                <KeyboardShortcut
                  shortcut="F"
                  description={t('Filter transactions')}
                />
                <KeyboardShortcut
                  shortcut="J"
                  description={t('Move to the next transaction down')}
                />
                <KeyboardShortcut
                  shortcut="K"
                  description={t('Move to the next transaction up')}
                />
                <KeyboardShortcut
                  shortcut="↑"
                  description={t(
                    'Move to the previous transaction and scroll',
                  )}
                />
                <KeyboardShortcut
                  shortcut="↓"
                  description={t('Move to the next transaction and scroll')}
                />
                <KeyboardShortcut
                  shortcut="Space"
                  description={t('Toggle selection of current transaction')}
                />
                <KeyboardShortcut
                  shortcut="Shift+Space"
                  description={t(
                    'Toggle transactions between current and most recently selected transaction',
                  )}
                />
              </>
            )}
          </View>
        </ModalDescription>
      </View>
    </Modal>
  );
}
