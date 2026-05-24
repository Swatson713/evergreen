import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    // 'local' = files live on disk. Admin UI available at /keystatic during
    // `npm run dev`. For GitHub Pages deployment, only the pre-built static
    // site is deployed — no server or database required.
    kind: 'local',
  },

  // ─── Singletons ──────────────────────────────────────────────────────────
  // One-off editable pages / site settings.
  singletons: {

    // ── Home / Hero ──────────────────────────────────────────────────────
    home: singleton({
      label: 'Home — Hero Section',
      path: 'src/content/home/',
      schema: {
        headline: fields.text({
          label: 'Billboard Headline',
          description:
            'Large display text shown in the hero. Keep to ~8 words for best impact.',
          validation: { isRequired: true, length: { min: 1, max: 120 } },
        }),
        subtext: fields.text({
          label: 'Subtext / Tagline',
          description:
            'One or two sentences shown beneath the headline. Describes your firm and region.',
          multiline: true,
          validation: { isRequired: false },
        }),
        heroImage: fields.image({
          label: 'Hero Background Image',
          description:
            'Full-width landscape photo used as the hero backdrop. JPG or WebP, at least 1920 × 1080 px.',
          directory: 'public/images/hero',
          publicPath: '/images/hero/',
          validation: { isRequired: false },
        }),
        ctaPrimary: fields.text({
          label: 'Primary CTA Button Label',
          description: 'e.g. "Explore Our Services"',
          defaultValue: 'Explore Our Services',
          validation: { isRequired: false },
        }),
        ctaSecondary: fields.text({
          label: 'Secondary CTA Button Label',
          description: 'e.g. "View Field Projects"',
          defaultValue: 'View Field Projects',
          validation: { isRequired: false },
        }),

        defaultOgImage: fields.image({
          label: 'Default Social Share Image',
          description:
            'This image appears when someone shares any page from your site on social media (LinkedIn, Facebook, etc.) that does not have its own cover photo. ' +
            'Recommended size: 1200 × 630 px, JPG or PNG.',
          directory: 'public/images/og',
          publicPath: '/images/og/',
          validation: { isRequired: false },
        }),
      },
    }),

    // ── Resume / CV ──────────────────────────────────────────────────────
    // The uploaded PDF is stored at public/documents/<filename>.
    // Always name your file "resume.pdf" so the public download link
    // (/documents/resume.pdf) stays consistent after each update.
    resume: singleton({
      label: 'Resume / CV',
      path: 'src/content/resume/',
      schema: {
        cvFile: fields.file({
          label: 'Resume / CV (PDF)',
          description:
            'Upload your current CV or résumé as a PDF. ' +
            'Name the file "resume.pdf" each time so the download link stays constant.',
          directory: 'public/documents',
          publicPath: '/documents/',
          validation: { isRequired: false },
        }),
        buttonLabel: fields.text({
          label: 'Download Button Label',
          description: 'Text displayed on the CV download button.',
          defaultValue: 'Download CV',
          validation: { isRequired: false },
        }),
      },
    }),

    // ── About Section ────────────────────────────────────────────────────
    about: singleton({
      label: 'About Section',
      path: 'src/content/about/',
      schema: {

        eyebrow: fields.text({
          label: 'Eyebrow Label',
          description: 'Small uppercase label above the heading, e.g. "About the Firm".',
          defaultValue: 'About the Firm',
          validation: { isRequired: false },
        }),

        heading: fields.text({
          label: 'Section Heading',
          description: 'Main heading displayed prominently in the About section.',
          defaultValue: 'Field-Tested Expertise. Collaborative Practice.',
          validation: { isRequired: false },
        }),

        // Each array item becomes one <p> paragraph.
        // The admin UI shows them as an ordered list so they can be reordered.
        paragraphs: fields.array(
          fields.text({
            label: 'Paragraph',
            multiline: true,
            validation: { isRequired: true },
          }),
          {
            label: 'Body Paragraphs',
            description:
              'Each entry is one paragraph of text. Add, remove, or drag to reorder.',
            itemLabel: (props) => {
              const text = props.value ?? '';
              return text.length > 60 ? text.slice(0, 60) + '…' : text || 'Paragraph';
            },
          },
        ),

        // Optional headshot or field photo shown in the right column.
        photo: fields.image({
          label: 'Photo (headshot or field image)',
          description:
            'Optional. Displayed in the right column alongside your bio. ' +
            'Portrait or square crop works best — aim for at least 600 × 700 px.',
          directory: 'public/images/about',
          publicPath: '/images/about/',
          validation: { isRequired: false },
        }),

        photoAlt: fields.text({
          label: 'Photo Alt Text',
          description: 'Describe the photo for screen readers, e.g. "Jane Smith, RPA, in the field."',
          validation: { isRequired: false },
        }),

        // Up to 4 credential / specialisation badges shown in the grid.
        credentials: fields.array(
          fields.object({
            abbr: fields.text({
              label: 'Abbreviation / Short Label',
              description: 'Displayed large, e.g. "RPA", "NHPA", "PNW".',
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: 'Full Description',
              description: 'Displayed small beneath the abbreviation.',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Credentials / Specialisations',
            description:
              'Up to 4 badges. Shown in the right column when no photo is uploaded, ' +
              'or below the photo when one is present.',
            itemLabel: (props) => props.fields.abbr.value || 'Credential',
          },
        ),
      },
    }),

    // ── Contact Section ──────────────────────────────────────────────────
    contact: singleton({
      label: 'Contact Section',
      path: 'src/content/contact/',
      schema: {

        heading: fields.text({
          label: 'Section Heading',
          description: 'Main heading displayed in the contact section.',
          defaultValue: 'Ready to Start Your Project?',
          validation: { isRequired: false },
        }),

        subtext: fields.text({
          label: 'Subtext',
          description: 'Short paragraph beneath the heading.',
          multiline: true,
          defaultValue:
            'Whether you need a Phase I survey, Section 106 consultation, or a comprehensive CRM plan, reach out and we\'ll respond within one business day.',
          validation: { isRequired: false },
        }),

        email: fields.text({
          label: 'Contact Email',
          description: 'The email address displayed and linked in the contact section.',
          defaultValue: 'info@evergreenarchaeology.com',
          validation: { isRequired: true },
        }),

        phone: fields.text({
          label: 'Phone Number (optional)',
          description: 'Displayed alongside the email if provided, e.g. "(360) 555-0100".',
          validation: { isRequired: false },
        }),

        address: fields.text({
          label: 'Office / Service Area (optional)',
          description: 'Short location line shown in the contact block, e.g. "Pacific Northwest, USA".',
          defaultValue: 'Pacific Northwest, USA',
          validation: { isRequired: false },
        }),

        formspreeId: fields.text({
          label: 'Formspree Form ID',
          description:
            'Create a free account at formspree.io, add a new form, and paste the Form ID here (e.g. "xpwzgkqr"). ' +
            'Formspree forwards every submission to your contact email — no server required. ' +
            'Leave blank to hide the contact form.',
          validation: { isRequired: false },
        }),

        formHeading: fields.text({
          label: 'Form Heading',
          description: 'Heading displayed above the contact form.',
          defaultValue: 'Send a Message',
          validation: { isRequired: false },
        }),
      },
    }),
  },

  // ─── Collections ─────────────────────────────────────────────────────────
  // Repeatable content — one entry per field project / survey.
  collections: {
    projects: collection({
      label: 'Field Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      schema: {
        // Title doubles as the URL slug (auto-generated by Keystatic).
        title: fields.slug({
          name: {
            label: 'Project Title',
            description:
              'Full name of the project, survey area, or site assessment. ' +
              'This becomes the URL slug (/projects/your-project-title).',
          },
        }),

        date: fields.date({
          label: 'Project Date',
          description: 'Date the survey or field work was completed (or started).',
          validation: { isRequired: false },
        }),

        location: fields.text({
          label: 'Location / County',
          description: 'General location, e.g. "Jefferson County, Washington" or "King County, WA".',
          validation: { isRequired: false },
        }),

        projectType: fields.select({
          label: 'Project Type',
          description: 'Primary CRM service category.',
          options: [
            { label: 'Phase I Survey',           value: 'phase-i-survey' },
            { label: 'Phase II Evaluation',      value: 'phase-ii-evaluation' },
            { label: 'Phase III Data Recovery',  value: 'phase-iii-data-recovery' },
            { label: 'Section 106 Compliance',   value: 'section-106' },
            { label: 'Archaeological Monitoring', value: 'monitoring' },
            { label: 'Cultural Resource Assessment', value: 'cra' },
            { label: 'Other',                    value: 'other' },
          ],
          defaultValue: 'phase-i-survey',
        }),

        summary: fields.text({
          label: 'Project Summary',
          description:
            'Short narrative (2–4 sentences) describing the project scope, methods, and key findings. ' +
            'Displayed on the project detail page.',
          multiline: true,
          validation: { isRequired: false },
        }),

        // Thumbnail shown in the homepage grid and projects listing.
        coverImage: fields.image({
          label: 'Cover / Thumbnail Image',
          description:
            'Primary image shown in the project grid. Landscape orientation works best.',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
          validation: { isRequired: false },
        }),

        // Full photo gallery — each entry is an image + optional caption.
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Photo',
              directory: 'public/images/projects',
              publicPath: '/images/projects/',
              validation: { isRequired: true },
            }),
            caption: fields.text({
              label: 'Caption (optional)',
              description: 'Short description of what is shown in this photo.',
              validation: { isRequired: false },
            }),
          }),
          {
            label: 'Photo Gallery',
            description:
              'Additional field photographs. Drag to reorder. ' +
              'JPG or WebP preferred; aim for consistent aspect ratios.',
            itemLabel: (props) => props.fields.caption.value || 'Photo',
          },
        ),

        featured: fields.checkbox({
          label: 'Feature on homepage',
          description: 'When checked, this project appears first in the homepage grid.',
          defaultValue: false,
        }),
      },
    }),
  },
});
