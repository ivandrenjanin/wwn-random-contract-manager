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

interface PackageJson {
    name: string;
    version: string;
    description: string;
    private: boolean;
    type: string;
    scripts: Record<string, string>;
    author: string;
    license: string;
    engines: Record<string, string>;
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
}

class VersionManager {
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

    private getFullVersion(): string {
        const { major, minor, patch } = this.versionConfig.module;
        return `v${this.versionConfig.foundry.major}.${major}.${minor}${patch}`;
    }

    private updatePackageJson(): void {
        const packagePath = path.join(this.projectRoot, "package.json");
        const packageContent = fs.readFileSync(packagePath, "utf-8");
        const packageJson: PackageJson = JSON.parse(packageContent);

        // Update version to use semantic versioning (without Foundry prefix)
        packageJson.version = this.getModuleVersion();

        // Write back to file
        fs.writeFileSync(
            packagePath,
            JSON.stringify(packageJson, null, 2) + "\n",
        );
        console.log(
            `✅ Updated package.json version to ${packageJson.version}`,
        );
    }

    private updateModuleJson(): void {
        // Don't modify the static module.json - it's now a template
        console.log(
            `ℹ️  Static module.json is now a template - will be processed during build`,
        );
    }

    private updateDownloadUrl(): void {
        // Don't modify the static module.json - it's now a template
        console.log(
            `ℹ️  Download URL will be processed during build from template`,
        );
    }

    public updateAll(): void {
        console.log("🔄 Starting version update process...");
        console.log(`📦 Module version: ${this.getModuleVersion()}`);
        console.log(`🎮 Foundry version: ${this.getFoundryVersion()}`);
        console.log(`🏷️  Full version: ${this.getFullVersion()}`);

        try {
            this.updatePackageJson();
            this.updateModuleJson();
            this.updateDownloadUrl();
            console.log("✅ All version files updated successfully!");
        } catch (error) {
            console.error("❌ Error updating versions:", error);
            process.exit(1);
        }
    }

    public bumpVersion(type: "major" | "minor" | "patch"): void {
        console.log(`🔄 Bumping ${type} version...`);

        // eslint-disable-next-line no-plusplus
        this.versionConfig.module[type]++;

        // Reset lower versions when bumping higher ones
        if (type === "major") {
            this.versionConfig.module.minor = 0;
            this.versionConfig.module.patch = 0;
        } else if (type === "minor") {
            this.versionConfig.module.patch = 0;
        }

        // Save updated config
        const configPath = path.join(this.projectRoot, "version.json");
        fs.writeFileSync(
            configPath,
            JSON.stringify(this.versionConfig, null, 2) + "\n",
        );

        console.log(`✅ Version bumped to ${this.getModuleVersion()}`);

        // Update all files
        this.updateAll();
    }

    public showCurrentVersions(): void {
        console.log("📊 Current Version Information:");
        console.log(`   Module: ${this.getModuleVersion()}`);
        console.log(`   Foundry: ${this.getFoundryVersion()}`);
        console.log(`   Full: ${this.getFullVersion()}`);
        console.log(
            `   Foundry Compatibility: ${this.versionConfig.foundry.minimum}-${this.versionConfig.foundry.maximum}`,
        );
    }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

const versionManager = new VersionManager();

switch (command) {
    case "update":
        versionManager.updateAll();
        break;
    case "bump-major":
        versionManager.bumpVersion("major");
        break;
    case "bump-minor":
        versionManager.bumpVersion("minor");
        break;
    case "bump-patch":
        versionManager.bumpVersion("patch");
        break;
    case "show":
        versionManager.showCurrentVersions();
        break;
    default:
        console.log("Usage:");
        console.log("  npm run version:update     - Update all version files");
        console.log("  npm run version:bump-major - Bump major version");
        console.log("  npm run version:bump-minor - Bump minor version");
        console.log("  npm run version:bump-patch - Bump patch version");
        console.log("  npm run version:show       - Show current versions");
        break;
}
