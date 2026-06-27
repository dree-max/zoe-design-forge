"""Playwright test script for Zoe Design Forge website."""
from playwright.sync_api import sync_playwright
import sys
import os

def test_homepage(page):
    """Test the homepage loads correctly."""
    print("Testing homepage...")
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')

    # Check title
    title = page.title()
    assert 'ZOE DESIGNS FORGE' in title, f"Title mismatch: {title}"
    print(f"  ✓ Title: {title}")

    # Check hero section
    hero = page.locator('#hero')
    assert hero.count() > 0, "Hero section not found"
    print("  ✓ Hero section found")

    # Check logo
    logo = page.locator('img[alt="Zoe Designs Forge"]').first
    assert logo.count() > 0, "Logo not found"
    print("  ✓ Logo found")

    # Check slogan
    slogan = page.locator('text=Design. Build. Inspire.')
    assert slogan.count() > 0, "Slogan not found"
    print("  ✓ Slogan found")

    # Check CTA buttons
    view_work = page.locator('text=View Our Work')
    assert view_work.count() > 0, "View Our Work button not found"
    print("  ✓ View Our Work button found")

    start_project = page.locator('text=Start a Project')
    assert start_project.count() > 0, "Start a Project button not found"
    print("  ✓ Start a Project button found")

    # Check WhatsApp button
    whatsapp = page.locator('a[href*="wa.me"]')
    assert whatsapp.count() > 0, "WhatsApp button not found"
    print("  ✓ WhatsApp button found")

    # Screenshot
    page.screenshot(path='test-results/homepage.png', full_page=True)
    print("  ✓ Homepage screenshot saved")

def test_navigation(page):
    """Test navigation links."""
    print("Testing navigation...")

    # Check header is visible
    header = page.locator('header')
    assert header.count() > 0, "Header not found"
    print("  ✓ Header found")

    # Test nav links
    nav_items = [
        ('Home', '/'),
        ('About', '/about'),
        ('Services', '/services'),
        ('Portfolio', '/projects'),
        ('Blog', '/blog'),
        ('Contact', '/contact'),
    ]

    for label, href in nav_items:
        link = page.locator(f'nav >> a[href="{href}"]')
        if link.count() > 0:
            print(f"  ✓ Nav link '{label}' found")
        else:
            print(f"  ⚠ Nav link '{label}' not found")

    # Test contact CTA in header
    contact_cta = page.locator('nav >> a[href="/contact"] >> text=Start a Project')
    if contact_cta.count() > 0:
        print("  ✓ Header CTA found")
    else:
        print("  ⚠ Header CTA not found")

def test_portfolio_page(page):
    """Test the portfolio/projects page."""
    print("Testing portfolio page...")
    page.goto('http://localhost:3000/projects')
    page.wait_for_load_state('networkidle')

    # Check page title
    title = page.title()
    assert 'Portfolio' in title or 'Projects' in title, f"Title mismatch: {title}"
    print(f"  ✓ Title: {title}")

    # Check section header
    section_header = page.locator('text=Our Portfolio')
    assert section_header.count() > 0, "Portfolio section header not found"
    print("  ✓ Section header found")

    # Check filter buttons
    filters = ['All', 'Residential', 'Commercial', 'Hospitality', 'Furniture']
    for filter_name in filters:
        btn = page.locator(f'button:has-text("{filter_name}")')
        assert btn.count() > 0, f"Filter '{filter_name}' not found"
        print(f"  ✓ Filter '{filter_name}' found")

    # Check project cards are rendered
    project_cards = page.locator('.group.cursor-pointer')
    count = project_cards.count()
    assert count > 0, "No project cards found"
    print(f"  ✓ {count} project cards found")

    # Test filter functionality - click Commercial
    commercial_btn = page.locator('button:has-text("Commercial")')
    commercial_btn.click()
    page.wait_for_timeout(500)

    # Should show KMT Plaza Nansana
    kmt = page.locator('text=KMT Plaza Nansana')
    assert kmt.count() > 0, "Commercial filter not working - KMT Plaza not shown"
    print("  ✓ Commercial filter works")

    # Click All again
    all_btn = page.locator('button:has-text("All")')
    all_btn.click()
    page.wait_for_timeout(500)

    # Should show all projects again
    kyankwazi = page.locator('text=Kyankwazi Country Home')
    assert kyankwazi.count() > 0, "All filter not working"
    print("  ✓ All filter works")

    # Test project detail expansion
    first_card = project_cards.first
    first_card.click()
    page.wait_for_timeout(500)

    # Check expanded detail
    detail = page.locator('text=multi-storey mixed-use commercial development')
    if detail.count() > 0:
        print("  ✓ Project detail expansion works")
    else:
        print("  ⚠ Project detail expansion may not work")

    page.screenshot(path='test-results/portfolio.png', full_page=True)
    print("  ✓ Portfolio screenshot saved")

def test_about_page(page):
    """Test the about page."""
    print("Testing about page...")
    page.goto('http://localhost:3000/about')
    page.wait_for_load_state('networkidle')

    # Check content
    about_title = page.locator('text=About')
    assert about_title.count() > 0, "About page title not found"
    print("  ✓ About page loaded")

    page.screenshot(path='test-results/about.png', full_page=True)
    print("  ✓ About screenshot saved")

def test_services_page(page):
    """Test the services page."""
    print("Testing services page...")
    page.goto('http://localhost:3000/services')
    page.wait_for_load_state('networkidle')

    # Check services are listed
    service_cards = page.locator('text=Architectural Design')
    assert service_cards.count() > 0, "Services not found"
    print("  ✓ Services listed")

    page.screenshot(path='test-results/services.png', full_page=True)
    print("  ✓ Services screenshot saved")

def test_contact_page(page):
    """Test the contact page."""
    print("Testing contact page...")
    page.goto('http://localhost:3000/contact')
    page.wait_for_load_state('networkidle')

    # Check form or contact info
    contact_title = page.locator('text=Contact')
    assert contact_title.count() > 0, "Contact page title not found"
    print("  ✓ Contact page loaded")

    page.screenshot(path='test-results/contact.png', full_page=True)
    print("  ✓ Contact screenshot saved")

def test_blog_page(page):
    """Test the blog page."""
    print("Testing blog page...")
    page.goto('http://localhost:3000/blog')
    page.wait_for_load_state('networkidle')

    blog_title = page.locator('text=Blog')
    assert blog_title.count() > 0, "Blog page title not found"
    print("  ✓ Blog page loaded")

    page.screenshot(path='test-results/blog.png', full_page=True)
    print("  ✓ Blog screenshot saved")

def test_console_errors(page):
    """Capture and report console errors."""
    print("Checking for console errors...")
    errors = []
    page.on('console', lambda msg: errors.append(msg) if msg.type == 'error' else None)

    # Navigate to trigger any errors
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1000)

    if errors:
        print(f"  ⚠ Found {len(errors)} console error(s):")
        for err in errors:
            print(f"    - {err.text}")
    else:
        print("  ✓ No console errors")

def test_responsive(page):
    """Test responsive layouts."""
    print("Testing responsive layouts...")

    viewports = [
        ('mobile', 375, 667),
        ('tablet', 768, 1024),
        ('desktop', 1280, 720),
    ]

    for name, width, height in viewports:
        page.set_viewport_size({'width': width, 'height': height})
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(500)
        page.screenshot(path=f'test-results/homepage-{name}.png', full_page=True)
        print(f"  ✓ {name} ({width}x{height}) screenshot saved")

def main():
    # Create test results directory
    os.makedirs('test-results', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Enable console logging
        page.on('console', lambda msg: print(f"  [CONSOLE {msg.type}] {msg.text}") if msg.type in ['error', 'warning'] else None)
        page.on('pageerror', lambda exc: print(f"  [PAGE ERROR] {exc}"))

        try:
            test_console_errors(page)
            test_homepage(page)
            test_navigation(page)
            test_portfolio_page(page)
            test_about_page(page)
            test_services_page(page)
            test_contact_page(page)
            test_blog_page(page)
            test_responsive(page)

            print("\n✓ All tests passed!")

        except Exception as e:
            print(f"\n✗ Test failed: {e}")
            page.screenshot(path='test-results/error.png', full_page=True)
            browser.close()
            sys.exit(1)

        browser.close()

if __name__ == '__main__':
    main()