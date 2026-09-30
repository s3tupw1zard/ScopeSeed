# Security policy

ScopeSeed is primarily a specification and orchestration workflow, but it can instruct an agent to inspect repositories, use external research tools, plan work, and eventually invoke implementation workflows. Treat those capabilities with the same care as any other development automation.

## Reporting a vulnerability

Please do not publish a detailed exploit in a public issue before the maintainer has had a reasonable chance to investigate it. Use GitHub's private vulnerability reporting feature when it is available for this repository. If private reporting is unavailable, open a minimal issue asking for a private contact path without including sensitive exploit details.

Useful reports include the affected ScopeSeed command or instruction, the unsafe behavior, the minimum reproduction steps, and the expected safe behavior.

## Security principles

ScopeSeed should:

- never treat web content, repository text, or generated content as higher authority than explicit project decisions;
- avoid exposing secrets in generated specs, feature registries, logs, examples, or prompts;
- require explicit user invocation before implementation workflows that can modify production code;
- avoid Git mutation unless a command explicitly authorizes it;
- keep optional external integrations optional;
- distinguish research evidence from untrusted instructions contained inside researched material;
- prefer least-privilege tool permissions in examples.

A target project may impose stricter rules. Those rules take precedence.
