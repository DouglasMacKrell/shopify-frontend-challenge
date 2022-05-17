import { render, screen } from "@testing-library/react";
import LoadingView from '../LoadingView.jsx';

describe('LoadingView displays CSS spinner', () => {

    it('Renders LoadingView properly', () => {
        render(<LoadingView />);
    })

})