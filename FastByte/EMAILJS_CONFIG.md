# 📧 Configuración de EmailJS para FastByte

EmailJS permite enviar emails directamente desde tu formulario sin necesidad de servidor.

## 🚀 Pasos de configuración:

### 1. Crear cuenta en EmailJS
- Accede a: https://www.emailjs.com/
- Haz clic en **"Sign Up Free"**
- Completa tu registro con tu email

### 2. Conectar servicio de email
Una vez dentro del dashboard:

#### 2.1 Agregar servicio de email
- Ve a **Email Services** → **Add Service**
- Elige Gmail o tu proveedor de email
- Selecciona **Free** plan
- Sigue los pasos para conectar tu cuenta de email

#### 2.2 Copiar el Service ID
- En Email Services, verás tu service ID (ej: `service_xyz123`)
- **Reemplaza `service_fastbyte` en script.js con tu Service ID**

### 3. Crear plantilla de email
- Ve a **Email Templates** → **Create New Template**
- **Nombre de plantilla**: `template_fastbyte` (IMPORTANTE: usar este exactamente)
- En el editor de plantilla, agrega estos campos:

```
Subject: Nuevo mensaje de contacto de FastByte

From: {{email}}
Nombre: {{nombre}}
Teléfono: {{telefono}}

Mensaje:
{{mensaje}}
```

- Haz clic en **Save**

### 4. Obtener Public Key
- Ve a **Account** → **API Keys**
- Copia tu **Public Key**
- **Reemplaza `YOUR_PUBLIC_KEY_HERE` en script.js con tu Public Key**

## 📝 Cambios en script.js:

```javascript
// Línea 2 - Reemplaza con tu Public Key:
emailjs.init("pk_live_abc123def456..."); // Tu Public Key aquí

// Línea 73 - Reemplaza service_fastbyte con tu Service ID:
emailjs.sendForm('service_xyz123', 'template_fastbyte', this)
```

## ✅ Verificar configuración:

1. Abre `index.html` en el navegador
2. Completa el formulario de contacto
3. Haz clic en **Enviar Mensaje**
4. Deberías recibir un email en la dirección que configuraste

## 🐛 Solucionar problemas:

- **"Error de CORS"**: Asegúrate que la Public Key esté correcta
- **"Template not found"**: Verifica que el nombre de la plantilla sea `template_fastbyte`
- **No recibe email**: Revisa la carpeta de SPAM

## 💡 Notas importantes:

- EmailJS es **gratis** para hasta 200 emails/mes
- Los datos van directamente a tu email, **no se guardan en un servidor**
- Puedes recibir emails en cualquier cuenta de email configurada
- El nombre de la plantilla debe ser exactamente: `template_fastbyte`

## 📦 Variables disponibles en la plantilla:

- `{{nombre}}` - Nombre del usuario
- `{{email}}` - Email del usuario
- `{{telefono}}` - Teléfono del usuario
- `{{mensaje}}` - Mensaje del usuario

---

¿Necesitas ayuda? Revisa la documentación de EmailJS: https://www.emailjs.com/docs/
