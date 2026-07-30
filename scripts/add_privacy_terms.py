import json, os

privacy = {
    'en': {
        'title': 'Privacy Policy', 'lastUpdated': 'Last updated: July 2026',
        's1': {'title': 'Information We Collect', 'content': 'When you submit an inquiry or contact form on our website, we collect the personal information you provide, such as your name, email address, company name, phone number, and any message content. We also automatically collect certain technical information including your IP address, browser type, and pages visited through standard web analytics.'},
        's2': {'title': 'How We Use Your Information', 'content': 'We use your information to respond to your inquiries, provide product information and quotations, process orders, improve our website and services, and communicate important updates about our products.'},
        's3': {'title': 'Data Sharing & Third Parties', 'content': 'We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, provided they agree to keep your information confidential.'},
        's4': {'title': 'Data Security', 'content': 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL encryption.'},
        's5': {'title': 'Cookies', 'content': 'Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.'},
        's6': {'title': 'Your Rights', 'content': 'Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights, please contact us at info@grandpumps.com.'},
        's7': {'title': 'Contact Us', 'content': 'If you have any questions about this Privacy Policy, please contact us at info@grandpumps.com. ALFAGRAND, Yiwu, Zhejiang, China. Phone: +86-18657933982.'},
    },
    'es': {
        'title': 'Política de Privacidad', 'lastUpdated': 'Última actualización: Julio 2026',
        's1': {'title': 'Información que Recopilamos', 'content': 'Cuando envía un formulario de consulta, recopilamos la información personal que proporciona, como nombre, correo electrónico, empresa y teléfono.'},
        's2': {'title': 'Cómo Usamos su Información', 'content': 'Usamos su información para responder consultas, proporcionar cotizaciones y mejorar nuestros servicios.'},
        's3': {'title': 'Compartición de Datos', 'content': 'No vendemos ni alquilamos su información personal a terceros.'},
        's4': {'title': 'Seguridad de Datos', 'content': 'Implementamos medidas técnicas para proteger su información personal.'},
        's5': {'title': 'Cookies', 'content': 'Nuestro sitio web puede usar cookies para mejorar su experiencia.'},
        's6': {'title': 'Sus Derechos', 'content': 'Puede tener derecho a acceder, corregir o eliminar sus datos personales.'},
        's7': {'title': 'Contáctenos', 'content': 'Para preguntas sobre esta política, contáctenos en info@grandpumps.com.'},
    },
    'fr': {
        'title': 'Politique de Confidentialité', 'lastUpdated': 'Dernière mise à jour: Juillet 2026',
        's1': {'title': 'Informations Collectées', 'content': 'Lorsque vous soumettez un formulaire, nous collectons les informations personnelles que vous fournissez.'},
        's2': {'title': 'Utilisation des Informations', 'content': 'Nous utilisons vos informations pour répondre à vos demandes et améliorer nos services.'},
        's3': {'title': 'Partage des Données', 'content': 'Nous ne vendons pas vos informations personnelles à des tiers.'},
        's4': {'title': 'Sécurité', 'content': 'Nous mettons en œuvre des mesures de sécurité pour protéger vos données.'},
        's5': {'title': 'Cookies', 'content': 'Notre site utilise des cookies pour améliorer votre expérience.'},
        's6': {'title': 'Vos Droits', 'content': 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos données personnelles.'},
        's7': {'title': 'Contact', 'content': 'Pour toute question, contactez-nous à info@grandpumps.com.'},
    },
    'ar': {
        'title': 'سياسة الخصوصية', 'lastUpdated': 'آخر تحديث: يوليو 2026',
        's1': {'title': 'المعلومات التي نجمعها', 'content': 'عند تقديم نموذج استفسار، نجمع المعلومات الشخصية التي تقدمها مثل الاسم والبريد الإلكتروني.'},
        's2': {'title': 'كيفية استخدام معلوماتك', 'content': 'نستخدم معلوماتك للرد على استفساراتك وتقديم عروض الأسعار.'},
        's3': {'title': 'مشاركة البيانات', 'content': 'لا نبيع معلوماتك الشخصية لأطراف ثالثة.'},
        's4': {'title': 'أمن البيانات', 'content': 'نطبق إجراءات فنية لحماية معلوماتك الشخصية.'},
        's5': {'title': 'ملفات تعريف الارتباط', 'content': 'قد يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح.'},
        's6': {'title': 'حقوقك', 'content': 'قد يكون لك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها.'},
        's7': {'title': 'اتصل بنا', 'content': 'للأسئلة حول هذه السياسة، اتصل بنا على info@grandpumps.com.'},
    },
    'pt': {
        'title': 'Política de Privacidade', 'lastUpdated': 'Última atualização: Julho 2026',
        's1': {'title': 'Informações Coletadas', 'content': 'Coletamos informações pessoais que você fornece ao enviar formulários em nosso site.'},
        's2': {'title': 'Uso das Informações', 'content': 'Usamos suas informações para responder a consultas e fornecer cotações.'},
        's3': {'title': 'Compartilhamento', 'content': 'Não vendemos suas informações pessoais a terceiros.'},
        's4': {'title': 'Segurança', 'content': 'Implementamos medidas para proteger suas informações pessoais.'},
        's5': {'title': 'Cookies', 'content': 'Nosso site pode usar cookies para melhorar sua experiência.'},
        's6': {'title': 'Seus Direitos', 'content': 'Você pode ter o direito de acessar ou excluir seus dados pessoais.'},
        's7': {'title': 'Contato', 'content': 'Para dúvidas sobre esta política, contate info@grandpumps.com.'},
    },
    'ru': {
        'title': 'Политика Конфиденциальности', 'lastUpdated': 'Последнее обновление: Июль 2026',
        's1': {'title': 'Собираемая Информация', 'content': 'При отправке формы запроса мы собираем предоставленную вами личную информацию.'},
        's2': {'title': 'Использование Информации', 'content': 'Мы используем вашу информацию для ответа на запросы.'},
        's3': {'title': 'Передача Данных', 'content': 'Мы не продаем вашу личную информацию третьим лицам.'},
        's4': {'title': 'Безопасность', 'content': 'Мы принимаем меры для защиты вашей личной информации.'},
        's5': {'title': 'Файлы Cookie', 'content': 'Наш сайт может использовать файлы cookie.'},
        's6': {'title': 'Ваши Права', 'content': 'Вы можете иметь право на доступ к вашим личным данным.'},
        's7': {'title': 'Контакты', 'content': 'По вопросам обращайтесь на info@grandpumps.com.'},
    },
}

terms = {
    'en': {
        'title': 'Terms of Service', 'lastUpdated': 'Last updated: July 2026',
        's1': {'title': 'Acceptance of Terms', 'content': 'By accessing and using the ALFAGRAND website, you agree to be bound by these Terms of Service.'},
        's2': {'title': 'Use of Website', 'content': 'You may use our website for lawful purposes only. All content including text, images, logos is the property of ALFAGRAND.'},
        's3': {'title': 'Product Information', 'content': 'Product details, pricing, and availability are subject to change without notice. Images are for illustration purposes.'},
        's4': {'title': 'Intellectual Property', 'content': 'The ALFAGRAND name and logo are trademarks. You may not use them without prior written permission.'},
        's5': {'title': 'Limitation of Liability', 'content': 'ALFAGRAND shall not be liable for any damages arising from the use of our website. We provide the website "as is".'},
        's6': {'title': 'Contact', 'content': 'For questions about these Terms, contact us at info@grandpumps.com. Phone: +86-18657933982.'},
    },
    'es': {
        'title': 'Términos de Servicio', 'lastUpdated': 'Última actualización: Julio 2026',
        's1': {'title': 'Aceptación', 'content': 'Al usar nuestro sitio web, acepta estos Términos de Servicio.'},
        's2': {'title': 'Uso del Sitio', 'content': 'Puede usar nuestro sitio solo para fines legales. Todo el contenido es propiedad de ALFAGRAND.'},
        's3': {'title': 'Información del Producto', 'content': 'Las especificaciones están sujetas a cambios sin previo aviso.'},
        's4': {'title': 'Propiedad Intelectual', 'content': 'El nombre ALFAGRAND es una marca registrada.'},
        's5': {'title': 'Limitación de Responsabilidad', 'content': 'ALFAGRAND no será responsable por daños derivados del uso de este sitio.'},
        's6': {'title': 'Contacto', 'content': 'Para preguntas, contacte info@grandpumps.com.'},
    },
}

for lang in ['en', 'es', 'fr', 'ar', 'pt', 'ru']:
    path = os.path.join('public/locales', lang, 'translation.json')
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if lang in privacy:
        data['privacy'] = privacy[lang]
    if lang in terms:
        data['terms'] = terms.get(lang, terms['en'])  # fallback to English

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'{lang}: privacy + terms added')

print('Done')
