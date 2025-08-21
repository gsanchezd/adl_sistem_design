'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/atoms';
import { Input } from '../../components/atoms';
import { Select } from '../../components/atoms';
import { Checkbox } from '../../components/atoms';
import { Radio } from '../../components/atoms';
import { Switch } from '../../components/atoms';
import { Badge } from '../../components/atoms';
import { Avatar } from '../../components/atoms';
import { Icon } from '../../components/atoms';
import { IconButton } from '../../components/atoms';
import { Logo } from '../../components/atoms';
import { ProgressBar } from '../../components/atoms';
import { Table } from '../../components/atoms';
import { Pagination } from '../../components/atoms';
import { ColorPalette } from '../../components/atoms';

export default function AtomsPage() {
  const { theme, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({
    basic: false,
    withLabel: false,
    indeterminate: true,
    notifications: true,
    marketing: false,
  });
  const [radioValue, setRadioValue] = useState('option1');
  const [planValue, setPlanValue] = useState('basic');
  const [sizeRadioValue, setSizeRadioValue] = useState('sm');
  const [switchStates, setSwitchStates] = useState({
    basic: false,
    withLabel: true,
    notifications: false,
    darkMode: false,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCheckboxChange = (name) => (e) => {
    setCheckboxStates(prev => ({
      ...prev,
      [name]: e.target.checked
    }));
  };

  const handleSwitchChange = (name) => (e) => {
    setSwitchStates(prev => ({
      ...prev,
      [name]: e.target.checked
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Button variant="outline" size="sm">
              <Icon name="chevronLeft" size="sm" className="mr-2" />
              Volver al Índice
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground">
            Componentes Atómicos
          </h1>
          <p className="text-lg text-muted-foreground">
            Componentes básicos del sistema de diseño basados en los diseños de referencia
          </p>
          
          <Button 
            onClick={toggleTheme}
            variant="outline"
            className="mt-4"
          >
            <Icon name="settings" size="sm" className="mr-2" />
            Cambiar a tema {theme === 'dark' ? 'claro' : 'oscuro'}
          </Button>
        </header>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Paleta de Colores</h2>
          <p className="text-muted-foreground">
            Colores base del sistema de diseño. Los colores se adaptan automáticamente al tema claro/oscuro.
          </p>
          
          <ColorPalette 
            showNames={true}
            showValues={true}
            copyable={true}
            size="md"
          />
          
          <div className="mt-8 p-4 bg-muted/20 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Cómo usar los colores:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <code className="bg-muted px-1 rounded">bg-primary</code> - Color primario de la marca</p>
              <p>• <code className="bg-muted px-1 rounded">bg-secondary</code> - Color secundario</p>
              <p>• <code className="bg-muted px-1 rounded">bg-destructive</code> - Para acciones destructivas</p>
              <p>• <code className="bg-muted px-1 rounded">text-muted-foreground</code> - Para texto secundario</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Botones</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button variant="primary">Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="destructive">Destructivo</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button size="sm">Pequeño</Button>
            <Button size="md">Mediano</Button>
            <Button size="lg">Grande</Button>
            <Button loading={loading} onClick={handleLoadingTest}>
              {loading ? 'Cargando...' : 'Probar Carga'}
            </Button>
            <Button disabled>Deshabilitado</Button>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              placeholder="Input básico"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input 
              placeholder="Buscar contenido..."
              leftIcon={<Icon name="search" />}
            />
            <Input 
              placeholder="Email"
              type="email"
              leftIcon={<Icon name="user" />}
            />
            <Input 
              placeholder="Con error"
              error={true}
              rightIcon={<Icon name="close" className="text-destructive" />}
            />
          </div>
          
          <div className="flex gap-4">
            <Input size="sm" placeholder="Pequeño" />
            <Input size="md" placeholder="Mediano" />
            <Input size="lg" placeholder="Grande" />
          </div>
        </section>

        {/* Select Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Select</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              placeholder="Selecciona una opción..."
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                'Opción 1',
                'Opción 2',
                'Opción 3'
              ]}
            />
            
            <Select 
              placeholder="Selecciona un rol..."
              options={[
                { value: 'student', label: 'Estudiante' },
                { value: 'teacher', label: 'Instructor' },
                { value: 'admin', label: 'Administrador' },
                { value: 'guest', label: 'Invitado', disabled: true }
              ]}
            />
          </div>
          
          <div className="flex gap-4">
            <Select size="sm" placeholder="Pequeño">
              <option value="sm1">Opción 1</option>
              <option value="sm2">Opción 2</option>
            </Select>
            
            <Select size="md" placeholder="Mediano">
              <option value="md1">Opción 1</option>
              <option value="md2">Opción 2</option>
            </Select>
            
            <Select size="lg" placeholder="Grande">
              <option value="lg1">Opción 1</option>
              <option value="lg2">Opción 2</option>
            </Select>
          </div>
          
          <div className="flex gap-4">
            <Select 
              placeholder="Con error"
              error={true}
              options={['Error 1', 'Error 2']}
            />
            <Select 
              disabled
              placeholder="Deshabilitado"
              options={['Disabled 1', 'Disabled 2']}
            />
          </div>
          
          {selectValue && (
            <p className="text-sm text-muted-foreground">
              Valor seleccionado: <strong>&quot;{selectValue}&quot;</strong>
            </p>
          )}
        </section>

        {/* Form Controls Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Controles de Formulario</h2>
            <p className="text-muted-foreground mt-2">Checkboxes, radios y switches para formularios interactivos</p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Checkboxes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Básicos</p>
                <div className="space-y-3">
                  <Checkbox 
                    checked={checkboxStates.basic}
                    onChange={handleCheckboxChange('basic')}
                  />
                  <Checkbox 
                    checked={checkboxStates.indeterminate}
                    indeterminate={true}
                    onChange={handleCheckboxChange('indeterminate')}
                  />
                  <Checkbox checked disabled />
                  <Checkbox error />
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Con etiquetas</p>
                <div className="space-y-3">
                  <Checkbox 
                    checked={checkboxStates.notifications}
                    onChange={handleCheckboxChange('notifications')}
                    label="Recibir notificaciones"
                    description="Te enviaremos actualizaciones por email"
                  />
                  <Checkbox 
                    checked={checkboxStates.marketing}
                    onChange={handleCheckboxChange('marketing')}
                    label="Marketing"
                    description="Ofertas y promociones especiales"
                  />
                  <Checkbox 
                    checked={false}
                    disabled
                    label="Opción deshabilitada"
                    description="Esta opción no está disponible"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <Checkbox size="sm" checked />
              <Checkbox size="md" checked />
              <Checkbox size="lg" checked />
              <span className="text-sm text-muted-foreground">Diferentes tamaños</span>
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Radio Buttons</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Grupo básico</p>
                <div className="space-y-3">
                  {['option1', 'option2', 'option3'].map((value, index) => (
                    <Radio
                      key={value}
                      name="basicGroup"
                      value={value}
                      checked={radioValue === value}
                      onChange={(e) => setRadioValue(e.target.value)}
                      label={`Opción ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Con descripciones</p>
                <div className="space-y-3">
                  <Radio
                    name="planGroup"
                    value="basic"
                    checked={planValue === 'basic'}
                    onChange={(e) => setPlanValue(e.target.value)}
                    label="Plan Básico"
                    description="Acceso a contenido básico y evaluaciones"
                  />
                  <Radio
                    name="planGroup"
                    value="premium"
                    checked={planValue === 'premium'}
                    onChange={(e) => setPlanValue(e.target.value)}
                    label="Plan Premium"
                    description="Acceso completo + tutorías personalizadas"
                  />
                  <Radio
                    name="planGroup"
                    value="enterprise"
                    checked={planValue === 'enterprise'}
                    onChange={(e) => setPlanValue(e.target.value)}
                    disabled
                    label="Plan Enterprise"
                    description="Para organizaciones (próximamente)"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <Radio 
                size="sm" 
                name="sizeDemo" 
                value="sm"
                checked={sizeRadioValue === 'sm'}
                onChange={(e) => setSizeRadioValue(e.target.value)}
              />
              <Radio 
                size="md" 
                name="sizeDemo" 
                value="md"
                checked={sizeRadioValue === 'md'}
                onChange={(e) => setSizeRadioValue(e.target.value)}
              />
              <Radio 
                size="lg" 
                name="sizeDemo" 
                value="lg"
                checked={sizeRadioValue === 'lg'}
                onChange={(e) => setSizeRadioValue(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">Diferentes tamaños</span>
            </div>
          </div>

          {/* Switches */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Switches</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Básicos</p>
                <div className="space-y-3">
                  <Switch 
                    checked={switchStates.basic}
                    onChange={handleSwitchChange('basic')}
                  />
                  <Switch checked disabled />
                  <Switch checked={false} disabled />
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Con etiquetas</p>
                <div className="space-y-4">
                  <Switch 
                    checked={switchStates.notifications}
                    onChange={handleSwitchChange('notifications')}
                    label="Notificaciones push"
                    description="Recibir notificaciones en tiempo real"
                  />
                  <Switch 
                    checked={switchStates.darkMode}
                    onChange={handleSwitchChange('darkMode')}
                    label="Modo oscuro"
                    description="Cambiar la apariencia de la aplicación"
                  />
                  <Switch 
                    checked={false}
                    disabled
                    label="Función experimental"
                    description="Esta función está en desarrollo"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <Switch size="sm" checked />
              <Switch size="md" checked />
              <Switch size="lg" checked />
              <span className="text-sm text-muted-foreground">Diferentes tamaños</span>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Badge status="completed">Completado</Badge>
            <Badge status="in-progress">En Progreso</Badge>
            <Badge status="pending">Pendiente</Badge>
            <Badge status="blocked">Bloqueado</Badge>
            <Badge status="optional">Opcional</Badge>
            <Badge status="active">ACTIVA</Badge>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Avatares</h2>
          <div className="flex items-end gap-4">
            <Avatar name="Gonzalo Sánchez" size="xs" />
            <Avatar name="María García" size="sm" />
            <Avatar name="Juan Pérez" size="md" />
            <Avatar name="Ana López" size="lg" />
            <Avatar name="Carlos Ruiz" size="xl" />
          </div>
          
          <div className="flex gap-4">
            <Avatar name="Usuario Test" />
            <Avatar name="Test User" />
            <Avatar name="T" />
            <Avatar />
          </div>
        </section>

        {/* IconButtons Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Botones de Icono</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Variantes de color</p>
              <div className="flex flex-wrap gap-3">
                <IconButton name="heart" variant="default" onClick={() => alert('Default')} />
                <IconButton name="star" variant="primary" onClick={() => alert('Primary')} />
                <IconButton name="message" variant="secondary" onClick={() => alert('Secondary')} />
                <IconButton name="close" variant="destructive" onClick={() => alert('Destructive')} />
                <IconButton name="settings" variant="outline" onClick={() => alert('Outline')} />
                <IconButton name="user" variant="ghost" onClick={() => alert('Ghost')} />
                <IconButton name="check" variant="success" onClick={() => alert('Success')} />
                <IconButton name="clock" variant="warning" onClick={() => alert('Warning')} />
                <IconButton name="question" variant="info" onClick={() => alert('Info')} />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">Diferentes tamaños</p>
              <div className="flex items-end gap-3">
                <IconButton name="lightning" variant="primary" size="xs" />
                <IconButton name="lightning" variant="primary" size="sm" />
                <IconButton name="lightning" variant="primary" size="md" />
                <IconButton name="lightning" variant="primary" size="lg" />
                <IconButton name="lightning" variant="primary" size="xl" />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">Estados</p>
              <div className="flex gap-3">
                <IconButton name="edit" variant="primary" />
                <IconButton name="edit" variant="primary" disabled />
              </div>
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Iconos</h2>
          <div className="grid grid-cols-8 md:grid-cols-12 gap-4">
            {[
              'search', 'user', 'users', 'chat', 'message', 'book', 'document',
              'heart', 'star', 'check', 'close', 'settings', 'chevronRight',
              'chevronDown', 'clock', 'badge', 'edit', 'chart', 'lightning'
            ].map((iconName) => (
              <div key={iconName} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-accent">
                <Icon name={iconName} size="lg" />
                <span className="text-xs text-muted-foreground">{iconName}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Logo Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Logo</h2>
          <p className="text-muted-foreground">
            Logo que cambia automáticamente según el tema actual
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Logo Estándar</h3>
              <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background">
                <Logo />
              </div>
            </div>
            
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Logo Pequeño</h3>
              <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background">
                <Logo width={80} height={26} className="h-4 sm:h-5 md:h-6" />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-accent rounded-lg">
            <p className="text-sm text-accent-foreground">
              <strong>💡 Tip:</strong> El logo cambia automáticamente según el tema. 
              Prueba el botón de cambio de tema para verlo en acción.
            </p>
          </div>
        </section>

        {/* Progress Bars Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Barra de Progreso</h2>
          <div className="space-y-4">
            <ProgressBar 
              value={75} 
              label="Mi progreso"
              showPercentage={true}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tamaño pequeño</p>
              <ProgressBar value={60} size="sm" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tamaño mediano</p>
              <ProgressBar value={60} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tamaño grande</p>
              <ProgressBar value={60} size="lg" />
            </div>
          </div>
          
        </section>

        {/* Tables Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Tablas</h2>
          
          <div className="space-y-6">
            {/* Tabla básica */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Tabla básica</p>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Rol</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Progreso</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Gonzalo Sánchez</Table.Cell>
                    <Table.Cell>Estudiante</Table.Cell>
                    <Table.Cell>
                      <Badge status="active">Activo</Badge>
                    </Table.Cell>
                    <Table.Cell>85%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>María García</Table.Cell>
                    <Table.Cell>Instructora</Table.Cell>
                    <Table.Cell>
                      <Badge status="completed">Online</Badge>
                    </Table.Cell>
                    <Table.Cell>100%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Juan Pérez</Table.Cell>
                    <Table.Cell>Estudiante</Table.Cell>
                    <Table.Cell>
                      <Badge status="in-progress">En progreso</Badge>
                    </Table.Cell>
                    <Table.Cell>45%</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            {/* Tabla con variaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Tamaño pequeño</p>
                <Table size="sm">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Módulo</Table.HeaderCell>
                      <Table.HeaderCell>Estado</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Módulo 1</Table.Cell>
                      <Table.Cell><Badge status="completed">Completado</Badge></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Módulo 2</Table.Cell>
                      <Table.Cell><Badge status="in-progress">En progreso</Badge></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-3">Sin hover ni rayas</p>
                <Table hoverable={false} striped={false}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Item</Table.HeaderCell>
                      <Table.HeaderCell>Valor</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Total estudiantes</Table.Cell>
                      <Table.Cell>1,247</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cursos activos</Table.Cell>
                      <Table.Cell>23</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* Pagination Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Paginación</h2>
          <p className="text-muted-foreground">
            Componente de navegación por páginas con soporte completo para accesibilidad.
          </p>
          
          <div className="space-y-8">
            {/* Basic pagination */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Paginación básica</h3>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
              <p className="text-sm text-muted-foreground">
                Página actual: <strong>{currentPage}</strong> de <strong>10</strong>
              </p>
            </div>

            {/* Different sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Tamaños</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Pequeña</p>
                  <Pagination
                    currentPage={3}
                    totalPages={15}
                    size="sm"
                    onPageChange={() => {}}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Mediana (por defecto)</p>
                  <Pagination
                    currentPage={7}
                    totalPages={15}
                    size="md"
                    onPageChange={() => {}}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Grande</p>
                  <Pagination
                    currentPage={5}
                    totalPages={15}
                    size="lg"
                    onPageChange={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* Different configurations */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Configuraciones</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Solo números de página</p>
                  <Pagination
                    currentPage={5}
                    totalPages={10}
                    showFirstLast={false}
                    showPrevNext={false}
                    onPageChange={() => {}}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Sin botones primera/última</p>
                  <Pagination
                    currentPage={8}
                    totalPages={20}
                    showFirstLast={false}
                    onPageChange={() => {}}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Pocas páginas visibles</p>
                  <Pagination
                    currentPage={12}
                    totalPages={50}
                    maxVisiblePages={3}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Propiedades principales:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <code className="bg-muted px-1 rounded">currentPage</code> - Página actual</p>
              <p>• <code className="bg-muted px-1 rounded">totalPages</code> - Total de páginas</p>
              <p>• <code className="bg-muted px-1 rounded">onPageChange</code> - Callback al cambiar página</p>
              <p>• <code className="bg-muted px-1 rounded">size</code> - Tamaño (sm, md, lg)</p>
              <p>• <code className="bg-muted px-1 rounded">maxVisiblePages</code> - Máximo de páginas visibles</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-12 border-t border-border">
          <p>Sistema de Diseño Empieza - Componentes Atómicos</p>
          <p className="mt-2">
            Tema actual: <strong>{theme}</strong> • 
            Valor del input: <strong>&quot;{inputValue}&quot;</strong> •
            Valor del select: <strong>&quot;{selectValue}&quot;</strong>
          </p>
          
          <div className="mt-4 space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                ← Índice
              </Button>
            </Link>
            <Link href="/molecules">
              <Button variant="primary" size="sm">
                Ver Moleculares →
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}