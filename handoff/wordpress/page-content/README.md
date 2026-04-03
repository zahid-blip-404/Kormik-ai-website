# Page Content — For WordPress

This folder is where you put the text content for each page so your CTO can copy it into WordPress.

## Pages on the Kormik Website

| Page | URL | File to create here |
|------|-----|---------------------|
| Homepage | `/` | `home.txt` |
| For Workers | `/for-workers` | `for-workers.txt` |
| For Sardars | `/for-sardars` | `for-sardars.txt` |
| For Contractors | `/for-contractors` | `for-contractors.txt` |
| For Organizations | `/for-enterprise` | `for-enterprise.txt` |
| How It Works | `/how-it-works` | `how-it-works.txt` |
| Impact | `/impact` | `impact.txt` |
| About | `/about` | `about.txt` |
| Blog | `/blog` | `blog.txt` |
| Contact | `/contact` | `contact.txt` |
| Privacy Policy | `/privacy` | `privacy.txt` |
| Terms of Service | `/terms` | `terms.txt` |

## How to Extract Page Content

The source of truth for page content is in the Next.js code:
- Homepage sections: `components/*.tsx`
- Individual pages: `app/[page-name]/page.tsx`

Your developer or Claude can extract the text from these files and save them here as `.txt` files for your CTO to use.
