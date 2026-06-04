import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Settings,
  Bell,
  Search,
  Layers,
  HelpCircle,
  LogIn,
  Menu,
} from 'lucide-react';
import { Header } from './Header';
import { NavItem } from '../../atoms/NavItem/NavItem';
import { Button } from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Badge } from '../../atoms/Badge/Badge';

const Logo = () => (
  <span
    className="flex h-[var(--size-icon-xl)] w-[var(--size-icon-xl)] items-center justify-center rounded-[var(--radius-component-md)] bg-[var(--color-action-primary)] text-[var(--color-text-inverse)] text-label-md font-bold"
    aria-hidden="true"
  >
    GL
  </span>
);

const PrimaryNav = ({ schema }: { schema?: boolean }) => (
  <>
    <NavItem href="/" label="Home" icon={<Home size="var(--size-icon-sm)" />} isActive schema={schema} />
    <NavItem href="/dashboard" label="Dashboard" icon={<LayoutDashboard size="var(--size-icon-sm)" />} schema={schema} />
    <NavItem href="/docs" label="Docs" icon={<BookOpen size="var(--size-icon-sm)" />} schema={schema} />
    <NavItem href="/components" label="Components" icon={<Layers size="var(--size-icon-sm)" />} schema={schema} />
  </>
);

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Page-level banner landmark (`<header>`) with compound slots for brand, navigation, and actions. Supports multiple visual variants and positioning modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <Header>
      <Header.Brand href="/">
        <Logo />
        <span className="truncate-label text-heading-h5">Geeklego</span>
      </Header.Brand>

      <Header.Nav>
        <PrimaryNav />
      </Header.Nav>

      <Header.Actions>
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Get started</Button>
      </Header.Actions>
    </Header>
  ),
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-lg)]">
      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Default — surface bg, bottom border</p>
        <Header>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <PrimaryNav />
          </Header.Nav>
          <Header.Actions>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Transparent — no bg, no border, blends with page surface</p>
        <div className="bg-[var(--color-surface-raised)]">
          <Header variant="transparent">
            <Header.Brand href="/">
              <Logo />
              <span className="truncate-label text-heading-h5">Geeklego</span>
            </Header.Brand>
            <Header.Nav>
              <PrimaryNav />
            </Header.Nav>
            <Header.Actions>
              <Button variant="ghost" size="sm">Sign in</Button>
              <Button variant="primary" size="sm">Get started</Button>
            </Header.Actions>
          </Header>
        </div>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Floating — overlay bg, subtle border, shadow; for fixed headers</p>
        <div style={{ minHeight: '80px' }}>
          <Header variant="floating">
            <Header.Brand href="/">
              <Logo />
              <span className="truncate-label text-heading-h5">Geeklego</span>
            </Header.Brand>
            <Header.Nav>
              <PrimaryNav />
            </Header.Nav>
            <Header.Actions>
              <Button variant="ghost" size="sm">Sign in</Button>
              <Button variant="primary" size="sm">Get started</Button>
            </Header.Actions>
          </Header>
        </div>
      </div>
    </div>
  ),
};

export const Positions: Story = {
  name: 'Positions',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-lg)]">
      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Sticky (default) — sticks to top on scroll</p>
        <Header>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <PrimaryNav />
          </Header.Nav>
          <Header.Actions>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Static — flows in normal document order</p>
        <Header position="static">
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <PrimaryNav />
          </Header.Nav>
          <Header.Actions>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Fixed — fixed to top, floats above content (use with floating variant)</p>
        <div style={{ minHeight: '80px' }}>
          <Header variant="floating" position="fixed">
            <Header.Brand href="/">
              <Logo />
              <span className="truncate-label text-heading-h5">Geeklego</span>
            </Header.Brand>
            <Header.Nav>
              <PrimaryNav />
            </Header.Nav>
            <Header.Actions>
              <Button variant="primary" size="sm">Get started</Button>
            </Header.Actions>
          </Header>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  name: 'States',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Default (mobile menu closed)</p>
        <Header>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <NavItem href="/" label="Home" isActive />
            <NavItem href="/docs" label="Docs" />
            <NavItem href="/components" label="Components" />
          </Header.Nav>
          <Header.Actions>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Nav item with badge notification</p>
        <Header>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <NavItem href="/" label="Home" isActive />
            <NavItem
              href="/inbox"
              label="Inbox"
              badge={<Badge variant="solid" size="sm">4</Badge>}
            />
            <NavItem href="/settings" label="Settings" />
          </Header.Nav>
          <Header.Actions>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              leftIcon={<Search size="var(--size-icon-md)" aria-hidden="true" />}
            >
              Search
            </Button>
            <Avatar variant="initials" initials="AB" size="sm" />
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">Schema.org WPHeader microdata (schema=true)</p>
        <Header schema>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <NavItem href="/" label="Home" isActive schema />
            <NavItem href="/docs" label="Docs" schema />
          </Header.Nav>
          <Header.Actions>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  render: () => (
    <div
      data-theme="dark"
      className="bg-primary rounded-[var(--radius-component-lg)] max-w-2xl overflow-hidden"
    >
      <Header>
        <Header.Brand href="/">
          <Logo />
          <span className="truncate-label text-heading-h5">Geeklego</span>
        </Header.Brand>
        <Header.Nav>
          <NavItem href="/" label="Home" isActive />
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/docs" label="Docs" />
        </Header.Nav>
        <Header.Actions>
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">Get started</Button>
        </Header.Actions>
      </Header>
    </div>
  ),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">
          Loading — skeleton placeholders replace nav content; aria-busy="true" on the header
        </p>
        <Header loading>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <NavItem href="/" label="Home" isActive />
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/docs" label="Docs" />
            <NavItem href="/components" label="Components" />
          </Header.Nav>
          <Header.Actions>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>

      <div>
        <p className="text-label-sm text-[var(--color-text-tertiary)] px-4 py-2">
          Resolved — nav content visible once loading completes
        </p>
        <Header>
          <Header.Brand href="/">
            <Logo />
            <span className="truncate-label text-heading-h5">Geeklego</span>
          </Header.Brand>
          <Header.Nav>
            <NavItem href="/" label="Home" isActive />
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/docs" label="Docs" />
            <NavItem href="/components" label="Components" />
          </Header.Nav>
          <Header.Actions>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">Get started</Button>
          </Header.Actions>
        </Header>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'default',
    position: 'sticky',
    schema: false,
    i18nStrings: {
      navLabel: 'Primary',
      mobileNavLabel: 'Navigation',
      openMenuLabel: 'Open menu',
      closeMenuLabel: 'Close menu',
    },
  },
  render: (args) => (
    <Header {...args}>
      <Header.Brand href="/">
        <Logo />
        <span className="truncate-label text-heading-h5">Geeklego</span>
      </Header.Brand>
      <Header.Nav>
        <NavItem href="/" label="Home" isActive />
        <NavItem href="/dashboard" label="Dashboard" />
        <NavItem href="/docs" label="Docs" />
        <NavItem href="/components" label="Components" />
      </Header.Nav>
      <Header.Actions>
        <Button variant="ghost" size="sm" iconOnly leftIcon={<Bell size="var(--size-icon-md)" aria-hidden="true" />}>
          Notifications
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          leftIcon={<Settings size="var(--size-icon-md)" aria-hidden="true" />}
        >
          Settings
        </Button>
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Get started</Button>
      </Header.Actions>
    </Header>
  ),
};

export const Mobile: Story = {
  name: 'Mobile',
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: () => (
    <Header>
      <Header.Brand href="/">
        <Logo />
        <span className="truncate-label text-heading-h5">Geeklego</span>
      </Header.Brand>

      <Header.Nav>
        <NavItem href="/" label="Home" isActive />
        <NavItem href="/dashboard" label="Dashboard" />
        <NavItem href="/docs" label="Docs" />
        <NavItem href="/components" label="Components" />
      </Header.Nav>

      <Header.Actions>
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Get started</Button>
      </Header.Actions>
    </Header>
  ),
};

export const Accessibility: Story = {
  name: 'Accessibility',
  tags: ['a11y'],
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)]">
      <Header
        aria-label="Site header"
        i18nStrings={{
          navLabel: 'Primary',
          mobileNavLabel: 'Navigation',
          openMenuLabel: 'Open menu',
          closeMenuLabel: 'Close menu',
        }}
      >
        <Header.Brand href="/">
          <Logo />
          <span className="truncate-label text-heading-h5">Geeklego</span>
        </Header.Brand>

        <Header.Nav>
          <NavItem href="/" label="Home" isActive />
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/beta" label="Beta" disabled />
          <NavItem
            href="/inbox"
            label="Inbox"
            badge={
              <Badge variant="solid" size="sm" aria-label="4 unread messages">
                4
              </Badge>
            }
          />
        </Header.Nav>

        <Header.Actions>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            leftIcon={<HelpCircle size="var(--size-icon-md)" aria-hidden="true" />}
          >
            Help
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<LogIn size="var(--size-icon-sm)" aria-hidden="true" />}
          >
            Sign in
          </Button>
          <Avatar
            variant="initials"
            initials="JD"
            size="sm"
            aria-label="Jane Doe — open user menu"
          />
        </Header.Actions>
      </Header>

      <div className="px-4">
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Resize below 768 px to reveal the mobile menu toggle. Press Escape or click outside to dismiss the mobile panel.
        </p>
      </div>
    </div>
  ),
};
