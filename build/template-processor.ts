import fs from "fs";
import path from "path";

interface VersionConfig {
    foundry: {
        major: number;
        minimum: number;
        verified: number;
        maximum: number;
    };
    module: {
        major: number;
        minor: number;
        patch: number;
    };
    metadata: {
        description: string;
        author: string;
        url: string;
    };
}

class TemplateProcessor {
    private versionConfig: VersionConfig;
    private projectRoot: string;

    constructor() {
        this.projectRoot = process.cwd();
        this.versionConfig = this.loadVersionConfig();
    }

    private loadVersionConfig(): VersionConfig {
        const configPath = path.join(this.projectRoot, "version.json");
        const configContent = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(configContent);
    }

    private getModuleVersion(): string {
        const { major, minor, patch } = this.versionConfig.module;
        return `${major}.${minor}.${patch}`;
    }

    private getFoundryVersion(): string {
        const { major, minor, patch } = this.versionConfig.module;
        return `v${this.versionConfig.foundry.major}.${major}.${minor}${patch}`;
    }

    public processModuleJson(): void {
        const templatePath = path.join(this.projectRoot, "module.json");
        const outputPath = path.join(this.projectRoot, "temp/module.json");

        if (!fs.existsSync(templatePath)) {
            console.error(`❌ Template file not found: ${templatePath}`);
            return;
        }

        // Read the template
        const templateContent = fs.readFileSync(templatePath, "utf-8");

        // Replace placeholders
        let processedContent = templateContent;

        // Replace version placeholder
        processedContent = processedContent.replace(
            /{{moduleVersion}}/g,
            this.getFoundryVersion(),
        );

        // Replace compatibility versions
        processedContent = processedContent.replace(
            /"minimum": \d+/,
            `"minimum": ${this.versionConfig.foundry.minimum}`,
        );
        processedContent = processedContent.replace(
            /"verified": \d+/,
            `"verified": ${this.versionConfig.foundry.verified}`,
        );
        processedContent = processedContent.replace(
            /"maximum": \d+/,
            `"maximum": ${this.versionConfig.foundry.maximum}`,
        );

        // Ensure dist directory exists
        const distDir = path.dirname(outputPath);
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // Write the processed file
        fs.writeFileSync(outputPath, processedContent);

        console.log(`✅ Processed module.json template to ${outputPath}`);
        console.log(`   Version: ${this.getFoundryVersion()}`);
        console.log(`   Module Version: ${this.getModuleVersion()}`);
    }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

const processor = new TemplateProcessor();

switch (command) {
    case "process":
        processor.processModuleJson();
        break;
    default:
        console.log("Usage:");
        console.log("  tsx ./build/template-processor.ts process");
        break;
}
