#!/usr/bin/env python3
"""
Simple Outlook Signup Automation Script
A simplified version of the automation script with minimal error handling.
"""

import argparse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def simple_automation(keep_open=True):
    """Simple automation without extensive error handling
    
    Args:
        keep_open (bool): Whether to keep the browser open after completion
    """
    # Initialize the Chrome driver
    driver = webdriver.Chrome()
    
    # Navigate to Outlook signup page
    driver.get("https://signup.live.com/")
    
    # Wait for and find email textbox (max 10 seconds)
    wait = WebDriverWait(driver, 10)
    email_field = wait.until(
        EC.presence_of_element_located((By.NAME, "MemberName"))
    )
    
    # Enter email address
    email_field.send_keys("random@outlook.com")
    
    print("Email entered successfully!")
    
    if keep_open:
        input("Press Enter to close the browser...")
    
    # Close browser
    driver.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Simple Outlook signup automation"
    )
    parser.add_argument(
        "--no-wait",
        action="store_true",
        help="Don't wait for user input before closing browser"
    )
    args = parser.parse_args()
    
    simple_automation(keep_open=not args.no_wait)
