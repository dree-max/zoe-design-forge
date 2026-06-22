import {
  brand,
  navItems,
  services,
  team,
  projects,
  type NavItem,
  type Project,
  type Service,
  type TeamMember,
} from "@/data/site";

describe("navItems", () => {
  it("uses real route paths instead of hash anchors", () => {
    navItems.forEach((item: NavItem) => {
      expect(item.href).not.toMatch(/^#/);
      expect(item.href).toMatch(/^\//);
    });
  });

  it("maps to the expected routes", () => {
    const mapping = Object.fromEntries(navItems.map((n) => [n.label, n.href]));
    expect(mapping["Home"]).toBe("/");
    expect(mapping["About"]).toBe("/about");
    expect(mapping["Services"]).toBe("/services");
    expect(mapping["Portfolio"]).toBe("/projects");
    expect(mapping["Blog"]).toBe("/blog");
    expect(mapping["Contact"]).toBe("/contact");
  });

  it("does not include Team in the navigation", () => {
    const labels = navItems.map((n) => n.label);
    expect(labels).not.toContain("Team");
  });
});

describe("brand", () => {
  it("has required contact fields", () => {
    expect(brand.name).toBe("ZOE DESIGN FORGE");
    expect(brand.email).toBeTruthy();
    expect(brand.phone).toBeTruthy();
    expect(brand.address).toBeTruthy();
    expect(brand.whatsapp).toBeTruthy();
  });

  it("has tagline and slogan", () => {
    expect(brand.tagline).toBeTruthy();
    expect(brand.slogan).toBeTruthy();
    expect(brand.subtitle).toBeTruthy();
    expect(brand.mission).toBeTruthy();
  });

  it("has social media links", () => {
    expect(brand.social.instagram).toContain("https://");
    expect(brand.social.facebook).toContain("https://");
    expect(brand.social.linkedin).toContain("https://");
  });
});

describe("services", () => {
  it("has at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("each service has required fields", () => {
    services.forEach((service: Service) => {
      expect(service.id).toBeTruthy();
      expect(service.icon).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.process.length).toBeGreaterThan(0);
    });
  });

  it("each service has a unique id", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes expected service types", () => {
    const titles = services.map((s) => s.title);
    expect(titles).toContain("Architectural Design");
    expect(titles).toContain("Interior Design");
    expect(titles).toContain("Project Management");
  });
});

describe("team", () => {
  it("has at least one team member", () => {
    expect(team.length).toBeGreaterThan(0);
  });

  it("each member has required fields", () => {
    team.forEach((member: TeamMember) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.bio).toBeTruthy();
      expect(member.qualifications.length).toBeGreaterThan(0);
    });
  });

  it("each member has unique name", () => {
    const names = team.map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    projects.forEach((project: Project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.location).toBeTruthy();
      expect(project.year).toBeTruthy();
      expect(project.scope).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.images.length).toBeGreaterThan(0);
    });
  });

  it("each project has a unique id", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("project years are valid 4-digit strings", () => {
    projects.forEach((project) => {
      expect(project.year).toMatch(/^\d{4}$/);
    });
  });

  it("project images have valid paths", () => {
    projects.forEach((project) => {
      project.images.forEach((img) => {
        expect(img).toMatch(/^\/images\//);
        expect(img).toMatch(/\.(jpg|jpeg|png|webp)$/);
      });
    });
  });

  it("contains expected categories", () => {
    const categories = [...new Set(projects.map((p) => p.category))];
    expect(categories).toContain("Commercial");
    expect(categories).toContain("Residential");
    expect(categories).toContain("Hospitality");
  });
});
