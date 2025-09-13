import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col w-full border-t border-primary">
            <div
                className="flex flex-col md:flex-row justify-between p-12 md:p-14 gap-8"
            >
                <div className="md:w-1/3 flex justify-center md:justify-start pl-0 md:pl-12">
                    <span className="title font-bold select-none">AWD LOGO</span>
                </div>

                <div className="md:w-1/3" >
                    <h3 className="title font-semibold mb-4">ლინკები</h3>
                    <ul className="flex flex-col gap-2 plain-text">
                        <li>
                            <a
                                href="https://jobs.hrajara.gov.ge/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                კალენდარი
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://jobs.hrajara.gov.ge/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                სიახლეები
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    className="md:w-1/3 flex justify-center md:justify-end flex-col text-right"
                >
                    <Link to={'/contact'} className="title font-semibold mb-4 hover:underline">კონტაქტი</Link>
                    <div className="plain-text">
                        <p>ბათუმი, მ. ლერმონტოვის ქ. #68</p>
                        <p>info@gmail.com</p>
                        <p>+995 422 24 78 82</p>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col sm:flex-row justify-between items-center px-6 py-3 text-sm"
            >
                <div className="uppercase flex justify-center sm:justify-start w-full sm:w-1/3">
                    &copy; 2025 awd.ge
                </div>

                <div className="flex justify-center gap-6 w-full sm:w-1/3 mt-3 sm:mt-0"></div>

                <div className="flex justify-center sm:justify-end w-full sm:w-1/3 mt-3 sm:mt-0">
                    All rights reserved &copy;
                </div>
            </div>
        </footer>
    );
};

export default Footer;
