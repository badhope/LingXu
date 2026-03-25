# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of LingXu seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via [GitHub Security Advisories](https://github.com/badhope/LingXu/security/advisories/new).

You can also email us directly at security@example.com (replace with actual email if available).

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., XSS, CSRF, injection, etc.)
- **Full path** of the affected file(s)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact** of the vulnerability
- **Possible solutions** (if you have any)

### Response Timeline

We are committed to responding to security reports promptly:

| Stage | Timeline |
|-------|----------|
| Initial Response | Within 48 hours |
| Vulnerability Confirmation | Within 7 days |
| Fix Development | Depends on complexity |
| Security Advisory Publication | After fix is released |

### Disclosure Policy

- We ask that you give us a reasonable amount of time to fix the issue before publishing it.
- We will credit you in the security advisory (unless you prefer to remain anonymous).
- We will not take legal action against security researchers who act in good faith.

## Security Best Practices

When using LingXu, we recommend:

### For Developers

- Keep dependencies up to date
- Run `npm audit` regularly
- Review code changes before merging
- Use environment variables for sensitive data
- Enable branch protection rules

### For Users

- Use the latest version of the project
- Report any suspicious behavior
- Do not share personal information in public issues

## Security Updates

Security updates will be published:

1. In [GitHub Security Advisories](https://github.com/badhope/LingXu/security/advisories)
2. In [CHANGELOG.md](CHANGELOG.md)
3. As a new release on GitHub

## Acknowledgments

We would like to thank all security researchers who have helped improve the security of LingXu through responsible disclosure.

---

*Last updated: 2024*
